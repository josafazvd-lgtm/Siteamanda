import os
import re
import ipaddress
import logging
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse

import httpx

logger = logging.getLogger(__name__)

EMAIL_BASE_URL = "https://integrations.emergentagent.com"

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} ≠ real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": os.environ["EMAIL_FROM_NAME"]}
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(f"{EMAIL_BASE_URL}/api/v1/email/send",
                                 headers={"X-Email-Key": os.environ["EMERGENT_EMAIL_KEY"]}, json=payload)
    resp.raise_for_status()
    return resp.json().get("id")


async def notify_new_message(msg: dict) -> None:
    brand = escape(os.environ["EMAIL_FROM_NAME"])
    admin_url = os.environ["FRONTEND_URL"].rstrip("/") + "/admin"
    email = escape(msg["email"])
    phone = escape(msg.get("phone") or "—")
    text = escape(msg["message"]).replace("\n", "<br>")
    html = (
        '<table role="presentation" width="100%" style="background:#F4F8FC"><tr><td style="padding:32px 16px">'
        '<table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;font-family:Arial,sans-serif;color:#0B1F3A">'
        '<tr><td style="background:#0B1F3A;color:#ffffff;padding:24px 28px;border-radius:16px 16px 0 0">'
        '<p style="margin:0;font-size:12px;letter-spacing:2px;color:#9CCBF0;text-transform:uppercase">Nova mensagem do site</p>'
        f'<p style="margin:8px 0 0;font-size:22px">{escape(msg["name"])} entrou em contato</p></td></tr>'
        '<tr><td style="padding:24px 28px;font-size:15px;line-height:1.6">'
        f'<p style="margin:0 0 6px"><strong>E-mail:</strong> <a href="mailto:{email}" style="color:#2F7DE1">{email}</a></p>'
        f'<p style="margin:0 0 18px"><strong>Telefone:</strong> {phone}</p>'
        f'<div style="background:#F4F8FC;border-radius:12px;padding:16px">{text}</div>'
        f'<p style="margin:24px 0 0"><a href="{escape(admin_url)}" style="display:inline-block;background:#0B1F3A;color:#ffffff;padding:12px 22px;border-radius:999px;text-decoration:none">Abrir painel</a></p>'
        '</td></tr>'
        f'<tr><td style="padding:16px 28px 24px;font-size:12px;color:#5B6B80">Aviso automático enviado por {brand}.</td></tr>'
        '</table></td></tr></table>'
    )
    try:
        await send_email(to=os.environ["NOTIFY_EMAIL"], subject=f"Nova mensagem de {msg['name']} pelo site", html=html)
    except Exception as e:
        logger.error(f"Notification email failed: {e}")

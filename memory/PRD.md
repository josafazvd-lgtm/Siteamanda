# PRD — Amanda Azevedo · Advocacia de Família

## Original problem statement
"Crie uma landing page: Crie uma pagina web simples para uma advogada de familia, com um painel admin simples para edição de textos, troca de fotos e logo, além de cores e disposição do elementos. Deve ser totalmente responsivo para mobile. Identidade azul claro e escuro,"
Dados: Amanda Azevedo, OAB 29.478, WhatsApp 91980324349, advamandaalvs@gmail.com, atendimento 100% online (sem endereço). Admin: login e-mail/senha (JWT).

## Architecture
- FastAPI + MongoDB: auth JWT (bcrypt, brute-force lock), `site_content` (single doc JSON), `messages`, `files`; Emergent Object Storage for uploads (`/api/upload`, `/api/files/{path}`).
- React: Landing (`/`), `/admin/login`, `/admin`. Defaults in `src/lib/defaults.js`, merged with DB content. Colors via CSS vars. framer-motion + lenis.

## Personas
- Visitante buscando advogada de família (mobile-first).
- Dra. Amanda (admin) editando o site sem código.

## Core requirements
- Landing responsiva, identidade azul claro/escuro.
- Admin: textos, fotos/logo, cores, ordem/visibilidade de seções, mensagens.

## Implemented (2026-10-07)
- Landing: hero cinético (masked reveal, parallax, tilt 3D, selo giratório), marquee editorial, Sobre (bento), Áreas, Como funciona, Depoimentos (oculto, placeholders), FAQ, Contato (form + WhatsApp + e-mail), rodapé, botão WhatsApp flutuante, favicon monograma.
- Admin: login JWT, abas Textos / Fotos e logo (upload) / Cores (presets + pickers) / Disposição (ordem, visibilidade, lado da foto, faixa) / Mensagens (ler, excluir, responder no WhatsApp).

## Backlog
- P1: Trocar senha pelo painel; notificação por e-mail de nova mensagem.
- P2: SEO por página/blog de artigos; depoimentos reais.

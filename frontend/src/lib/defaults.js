export const SECTION_LABELS = {
  about: "Sobre",
  areas: "Áreas de atuação",
  process: "Como funciona",
  testimonials: "Depoimentos",
  faq: "Perguntas frequentes",
  contact: "Contato",
};

export const DEFAULT_CONTENT = {
  brand: {
    name: "Amanda Azevedo",
    title: "Advocacia de Família",
    oab: "OAB 29.478",
    whatsapp: "5591980324349",
    email: "advamandaalvs@gmail.com",
    logo: "",
  },
  colors: { navy: "#0B1F3A", sky: "#9CCBF0", accent: "#2F7DE1", paper: "#F4F8FC" },
  layout: {
    heroImageSide: "right",
    showMarquee: true,
    sections: [
      { id: "about", visible: true },
      { id: "areas", visible: true },
      { id: "process", visible: true },
      { id: "testimonials", visible: false },
      { id: "faq", visible: true },
      { id: "contact", visible: true },
    ],
  },
  hero: {
    eyebrow: "Advocacia de Família · Atendimento 100% online",
    lines: "Cuidar da sua família\ntambém é um ato\nde justiça.",
    subtitle:
      "Orientação jurídica humanizada para os momentos mais delicados da vida familiar. Com escuta, sigilo e estratégia — de onde você estiver.",
    ctaPrimary: "Conversar no WhatsApp",
    ctaSecondary: "Enviar mensagem",
    image: "/images/portrait.jpg",
  },
  marquee: {
    items: "Divórcio · Guarda compartilhada · Pensão alimentícia · Partilha de bens · União estável · Regulamentação de convivência · Inventário",
  },
  about: {
    eyebrow: "Sobre a advogada",
    title: "Firmeza jurídica, com acolhimento em cada etapa.",
    text:
      "Sou Amanda Azevedo, advogada dedicada ao Direito de Família. Acredito que cada caso carrega uma história única — e que ela merece ser ouvida com atenção antes de qualquer estratégia.\n\nMeu atendimento é totalmente online, para que você tenha acesso a uma orientação jurídica de qualidade com conforto, agilidade e total sigilo.",
    image: "/images/online.jpg",
    quote: "Por trás de todo processo existe uma família. É por ela que eu trabalho.",
    highlights: [
      { value: "100%", label: "Atendimento online, em todo o Brasil" },
      { value: "Sigilo", label: "Confidencialidade em todas as conversas" },
      { value: "Escuta", label: "Atendimento humanizado e próximo" },
    ],
  },
  areas: {
    eyebrow: "Áreas de atuação",
    title: "Soluções para cada fase da vida familiar.",
    items: [
      { title: "Divórcio", text: "Consensual ou litigioso, judicial ou em cartório — conduzido com clareza e o mínimo de desgaste." },
      { title: "Guarda e convivência", text: "Guarda compartilhada ou unilateral e regulamentação de visitas, sempre priorizando o bem-estar dos filhos." },
      { title: "Pensão alimentícia", text: "Fixação, revisão e execução de alimentos, garantindo o sustento de quem mais precisa." },
      { title: "Partilha de bens", text: "Divisão justa do patrimônio, com análise cuidadosa do regime de bens do casal." },
      { title: "União estável", text: "Reconhecimento e dissolução de união estável, com segurança jurídica para ambos." },
      { title: "Inventário", text: "Inventário judicial ou extrajudicial, organizando a sucessão com respeito e agilidade." },
    ],
  },
  process: {
    eyebrow: "Como funciona",
    title: "Atendimento completo, sem sair de casa.",
    image: "/images/hands.jpg",
    steps: [
      { title: "Primeiro contato", text: "Você envia uma mensagem pelo WhatsApp ou pelo formulário e conta brevemente a sua situação." },
      { title: "Consulta online", text: "Conversamos por videochamada, com tempo e privacidade para entender cada detalhe." },
      { title: "Estratégia e documentos", text: "Apresento os caminhos possíveis e você envia os documentos de forma digital e segura." },
      { title: "Acompanhamento", text: "Você acompanha cada passo do seu caso com atualizações claras e diretas." },
    ],
  },
  testimonials: {
    eyebrow: "Depoimentos",
    title: "O que dizem as famílias atendidas.",
    items: [
      { quote: "[Insira aqui um depoimento real de cliente]", author: "[Nome do cliente]" },
      { quote: "[Insira aqui um depoimento real de cliente]", author: "[Nome do cliente]" },
    ],
  },
  faq: {
    eyebrow: "Dúvidas frequentes",
    title: "Perguntas que você talvez esteja se fazendo.",
    items: [
      { q: "O atendimento online tem a mesma validade?", a: "Sim. Processos judiciais hoje tramitam de forma eletrônica, e reuniões, assinaturas e envio de documentos podem ser feitos digitalmente, com total segurança." },
      { q: "Atende clientes de outras cidades ou estados?", a: "Sim. Como o atendimento é 100% online, é possível atender pessoas de diferentes localidades." },
      { q: "Minhas informações ficam em sigilo?", a: "Sempre. O sigilo profissional é um dever da advocacia e todas as conversas são tratadas com total confidencialidade." },
      { q: "Como agendo a primeira consulta?", a: "Basta chamar no WhatsApp ou enviar uma mensagem pelo formulário desta página. Retornarei para combinar o melhor horário." },
    ],
  },
  contact: {
    eyebrow: "Contato",
    title: "Vamos conversar sobre o seu caso?",
    text: "Envie sua mensagem. Retorno com atenção e no menor prazo possível.",
    image: "/images/family.jpg",
  },
  footer: {
    text: "Advocacia de Família com atendimento humanizado e 100% online. As informações deste site têm caráter informativo e não substituem uma consulta jurídica.",
  },
};

const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);

export function mergeContent(base, over) {
  if (!isObj(over)) return base;
  const out = { ...base };
  Object.keys(over).forEach((k) => {
    out[k] = isObj(base[k]) && isObj(over[k]) ? mergeContent(base[k], over[k]) : over[k] ?? base[k];
  });
  return out;
}

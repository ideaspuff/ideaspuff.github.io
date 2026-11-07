/**
 * Static, JavaScript-free pages and AI-readable files generated at build time.
 * Everything here reads from constants.ts and seo/services.ts.
 */
import { content, seo, SITE_URL } from '../constants';
import { services, Service } from './services';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const CONTACT = {
  email: content.es.business.contact.emailBtn,
  whatsapp: 'https://wa.me/5215569111742',
  telegram: `https://t.me/${content.es.business.contact.telegramBtn.replace('@', '')}`,
  linkedin: 'https://linkedin.com/in/manuelceomx',
  github: 'https://github.com/ideaspuff',
  youtube: 'https://youtube.com/c/manuelceo',
};

export const serviceUrl = (s: Service) => `${SITE_URL}/servicios/${s.slug}/`;
export const SERVICES_URL = `${SITE_URL}/servicios/`;

const ld = (data: unknown) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

/* ------------------------------------------------------------------ */
/* Shared shell                                                        */
/* ------------------------------------------------------------------ */
const STYLE = `
:root{--bg:#000c1a;--panel:#03162b;--line:rgba(255,255,255,.09);--text:#cbd5e1;--muted:#8193a8;--white:#fff;--cyan:#0DD6E8}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--text);font:400 18px/1.65 Outfit,system-ui,sans-serif;-webkit-font-smoothing:antialiased;
  background-image:radial-gradient(rgba(13,214,232,.10) 1px,transparent 1.4px),radial-gradient(ellipse at 80% -10%,rgba(37,99,235,.25),transparent 55%);
  background-size:26px 26px,100% 100%}
a{color:var(--cyan);text-decoration:none}a:hover{text-decoration:underline}
.wrap{max-width:1040px;margin:0 auto;padding:0 24px}
header.top{display:flex;justify-content:space-between;align-items:center;padding:22px 0}
.logo{font-weight:800;font-size:22px;color:var(--white);letter-spacing:-.02em}.logo span{color:var(--cyan)}
.top nav a{color:var(--muted);font:500 13px/1 'Share Tech Mono',monospace;letter-spacing:.2em;text-transform:uppercase;margin-left:22px}
.crumbs{font:13px/1.4 'Share Tech Mono',monospace;letter-spacing:.12em;color:var(--muted);margin:40px 0 18px;text-transform:uppercase}
.crumbs a{color:var(--muted)}.crumbs b{color:var(--cyan);font-weight:400}
h1{color:var(--white);font-weight:800;font-size:clamp(40px,7vw,76px);line-height:.98;letter-spacing:-.035em;margin:0 0 26px;text-transform:uppercase}
h2{color:var(--white);font-weight:700;font-size:clamp(26px,3.6vw,36px);letter-spacing:-.02em;margin:0 0 20px}
h3{color:var(--white);font-size:20px;margin:0 0 8px}
.lead{font-size:clamp(20px,2.4vw,25px);font-weight:300;color:#e2e8f0;max-width:780px;margin:0}
section{padding:64px 0;border-top:1px solid var(--line)}
.hero{padding:0 0 64px;border:0;animation:in .9s cubic-bezier(.16,1,.3,1) both}
@keyframes in{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
.card{background:linear-gradient(160deg,rgba(255,255,255,.06),rgba(255,255,255,.01));border:1px solid var(--line);border-radius:22px;padding:24px;transition:border-color .3s,transform .3s}
.card:hover{border-color:rgba(13,214,232,.5);transform:translateY(-3px)}
ul.check{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px 28px}
ul.check li{padding:10px 0 10px 30px;border-bottom:1px solid var(--line);position:relative}
ul.check li:before{content:'';position:absolute;left:4px;top:21px;width:12px;height:2px;background:var(--cyan)}
.tags{display:flex;flex-wrap:wrap;gap:8px}.tags span{font:12px/1 'Share Tech Mono',monospace;letter-spacing:.12em;text-transform:uppercase;border:1px solid var(--line);border-radius:99px;padding:8px 12px;color:var(--text)}
details{border-bottom:1px solid var(--line);padding:18px 0}
summary{cursor:pointer;color:var(--white);font-weight:600;font-size:19px;list-style:none;display:flex;justify-content:space-between;gap:16px}
summary::-webkit-details-marker{display:none}summary:after{content:'+';color:var(--cyan);font-weight:300;font-size:26px;line-height:1}
details[open] summary:after{content:'–'}
details p{margin:12px 0 0;color:var(--text)}
.cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}
.btn{display:inline-flex;align-items:center;gap:10px;padding:14px 24px;border-radius:99px;font-weight:700;border:1px solid var(--line);color:var(--white)}
.btn.primary{background:var(--cyan);color:#001020;border-color:var(--cyan);box-shadow:0 0 34px rgba(13,214,232,.35)}
.btn:hover{text-decoration:none;border-color:var(--cyan)}
.card a.more{display:inline-block;margin-top:14px;font-weight:600}
footer{padding:48px 0 64px;border-top:1px solid var(--line);color:var(--muted);font-size:15px}
footer nav{display:flex;flex-wrap:wrap;gap:8px 20px;margin-bottom:16px}
@media (max-width:640px){.top nav a{margin-left:14px;letter-spacing:.12em}body{font-size:17px}section{padding:48px 0}}
@media (prefers-reduced-motion:reduce){.hero{animation:none}.card{transition:none}}
`;

function shell(opts: { title: string; description: string; url: string; body: string; jsonLd: unknown[] }) {
  const { title, description, url, body, jsonLd } = opts;
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<meta name="author" content="Manuel Castellanos" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
<meta name="theme-color" content="#000c1a" />
<link rel="canonical" href="${url}" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Manuel Castellanos" />
<meta property="og:locale" content="es_MX" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:image" content="${SITE_URL}/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(description)}" />
<meta name="twitter:image" content="${SITE_URL}/og-image.png" />
<link rel="alternate" type="text/plain" title="llms.txt" href="/llms.txt" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&family=Share+Tech+Mono&display=swap" rel="stylesheet" />
<style>${STYLE}</style>
${jsonLd.map(ld).join('\n')}
<script async src="https://www.googletagmanager.com/gtag/js?id=G-9LY7HW7CM5"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-9LY7HW7CM5');</script>
</head>
<body>
<div class="wrap">
<header class="top">
  <a class="logo" href="/" aria-label="Inicio">MC<span>.</span></a>
  <nav aria-label="Principal"><a href="/servicios/">Servicios</a><a href="/#contact">Contacto</a></nav>
</header>
${body}
<footer>
  <nav aria-label="Servicios">${services.map((s) => `<a href="/servicios/${s.slug}/">${esc(s.name)}</a>`).join('')}</nav>
  <p>© ${new Date().getFullYear()} Manuel Castellanos · ${esc(content.es.business.footer.role)} · <a href="/">manuelcastellanos.com.mx</a></p>
</footer>
</div>
</body>
</html>
`;
}

const ctaBlock = (heading: string) => `
<section>
  <h2>${esc(heading)}</h2>
  <p class="lead">${esc(content.es.business.contact.description)}</p>
  <div class="cta">
    <a class="btn primary" href="${CONTACT.whatsapp}" rel="noopener">Escríbeme por WhatsApp →</a>
    <a class="btn" href="mailto:${CONTACT.email}">${esc(CONTACT.email)}</a>
    <a class="btn" href="${CONTACT.linkedin}" rel="noopener">LinkedIn</a>
  </div>
</section>`;

const personRef = { '@id': `${SITE_URL}/#person` };

/* ------------------------------------------------------------------ */
/* /servicios/<slug>/                                                  */
/* ------------------------------------------------------------------ */
export function renderServicePage(s: Service): string {
  const url = serviceUrl(s);
  const others = services.filter((o) => o.slug !== s.slug);
  const body = `
<main>
  <div class="crumbs"><a href="/">Inicio</a> / <a href="/servicios/">Servicios</a> / <b>${esc(s.name)}</b></div>
  <section class="hero">
    <h1>${esc(s.name)}</h1>
    <p class="lead">${esc(s.intro)}</p>
    <div class="cta"><a class="btn primary" href="${CONTACT.whatsapp}" rel="noopener">Platiquemos →</a><a class="btn" href="#preguntas">Preguntas frecuentes</a></div>
  </section>
  <section>
    <h2>Qué incluye</h2>
    <ul class="check">${s.includes.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
  </section>
  <section>
    <h2>Para quién es</h2>
    <div class="grid">${s.forWho.map((w) => `<div class="card"><p style="margin:0">${esc(w)}</p></div>`).join('')}</div>
  </section>
  <section>
    <h2>Tecnología</h2>
    <div class="tags">${s.stack.map((t) => `<span>${esc(t)}</span>`).join('')}</div>
  </section>
  <section id="preguntas">
    <h2>Preguntas frecuentes</h2>
    ${s.faqs.map((f, i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}
  </section>
  ${ctaBlock('¿Lo vemos para tu empresa?')}
  <section>
    <h2>Otros servicios</h2>
    <div class="grid">${others
      .map((o) => `<div class="card"><h3>${esc(o.name)}</h3><p style="margin:0">${esc(o.short)}</p><a class="more" href="/servicios/${o.slug}/">Ver servicio →</a></div>`)
      .join('')}</div>
  </section>
</main>`;

  return shell({
    title: s.title,
    description: s.description,
    url,
    body,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${url}#service`,
        name: s.name,
        description: s.description,
        url,
        serviceType: s.name,
        provider: { '@type': 'Person', name: 'Manuel Castellanos', url: `${SITE_URL}/`, ...personRef },
        areaServed: { '@type': 'Country', name: 'México' },
        availableLanguage: ['es', 'en'],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: s.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Servicios', item: SERVICES_URL },
          { '@type': 'ListItem', position: 3, name: s.name, item: url },
        ],
      },
    ],
  });
}

/* ------------------------------------------------------------------ */
/* /servicios/                                                         */
/* ------------------------------------------------------------------ */
export function renderServicesIndex(): string {
  const title = 'Servicios de IA, cloud y software | Manuel Castellanos';
  const description =
    'Agentes de IA de voz y chat, automatización de procesos, arquitectura cloud y software a la medida para empresas en México.';
  const body = `
<main>
  <div class="crumbs"><a href="/">Inicio</a> / <b>Servicios</b></div>
  <section class="hero">
    <h1>Servicios</h1>
    <p class="lead">${esc(content.es.business.manifesto.replace(/\*/g, ''))}</p>
  </section>
  <section>
    <div class="grid">${services
      .map((s) => `<div class="card"><h3>${esc(s.name)}</h3><p style="margin:0">${esc(s.short)}</p><a class="more" href="/servicios/${s.slug}/">Ver servicio →</a></div>`)
      .join('')}</div>
  </section>
  ${ctaBlock('¿Tienes un proyecto en mente?')}
</main>`;
  return shell({
    title,
    description,
    url: SERVICES_URL,
    body,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Servicios',
        itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.name, url: serviceUrl(s) })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Servicios', item: SERVICES_URL },
        ],
      },
    ],
  });
}

/* ------------------------------------------------------------------ */
/* llms.txt  (https://llmstxt.org)                                     */
/* ------------------------------------------------------------------ */
export function renderLlmsTxt(): string {
  return `# Manuel Castellanos

> Arquitecto de IA y cloud en México. Ayudo a empresas a vender más y operar mejor con agentes de IA de voz y chat, automatización de procesos, arquitectura cloud y software a la medida. Trabajo en español e inglés.

- Sitio: ${SITE_URL}/
- English version: ${SITE_URL}/?lang=en
- Contacto: ${CONTACT.email} · WhatsApp ${CONTACT.whatsapp} · Telegram ${CONTACT.telegram}
- También doy conferencias y capacitaciones corporativas.

## Servicios

${services.map((s) => `- [${s.name}](${serviceUrl(s)}): ${s.short}`).join('\n')}

## Áreas de experiencia

- IA conversacional: ${content.es.tech.expertise.cards.ai.items.join(', ')}
- Cloud: ${content.es.tech.expertise.cards.cloud.items.join(', ')}
- Full stack: ${content.es.tech.expertise.cards.dev.items.join(', ')}
- Datos: ${content.es.tech.ecosystem.cards.database.items.join(', ')}
- DevOps: Docker, Kubernetes, Terraform, CI/CD

## Perfil

- [Página principal](${SITE_URL}/): ${seo.es.description}
- [LinkedIn](${CONTACT.linkedin})
- [GitHub](${CONTACT.github})
- [YouTube](${CONTACT.youtube})

## Optional

- [Contenido completo en texto](${SITE_URL}/llms-full.txt): todos los servicios con detalle y preguntas frecuentes.
- [Lista de servicios](${SERVICES_URL})
`.replace(/\n{3,}/g, '\n\n');
}

export function renderLlmsFullTxt(): string {
  const b = content.es.business;
  const t = content.es.tech;
  const svc = services
    .map(
      (s) => `## ${s.name}

URL: ${serviceUrl(s)}

${s.intro}

### Para quién es
${s.forWho.map((w) => `- ${w}`).join('\n')}

### Qué incluye
${s.includes.map((i) => `- ${i}`).join('\n')}

### Tecnología
${s.stack.join(', ')}

### Preguntas frecuentes
${s.faqs.map((f) => `**${f.q}**\n${f.a}`).join('\n\n')}
`
    )
    .join('\n');

  return `# Manuel Castellanos — contenido completo

> ${seo.es.description}

Sitio: ${SITE_URL}/
Contacto: ${CONTACT.email} · WhatsApp ${CONTACT.whatsapp} · Telegram ${CONTACT.telegram} · LinkedIn ${CONTACT.linkedin}

## Qué hago

${b.manifesto.replace(/\*/g, '')}

${t.manifesto.replace(/\*/g, '')}

${b.hero.phrases.map((p) => `- ${p}`).join('\n')}

${svc}
## Ecosistema técnico

${Object.values(t.ecosystem.cards)
  .map((c: any) => `- **${c.title}:** ${c.description}`)
  .join('\n')}

## Stack

Next.js, React, TypeScript, Node.js, PostgreSQL, Supabase, Firebase, React Native, Gemini, GPT-4o, ElevenLabs, LangChain, Google Cloud, Azure, Cloudflare, Docker, Kubernetes, Terraform, Python.

## Otros

- ${b.footer.extra}
- Idiomas de trabajo: español e inglés.
`;
}

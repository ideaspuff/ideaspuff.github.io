/**
 * Build-time SEO helpers, used by vite.config.ts.
 *
 * The site is a client-rendered React app, so crawlers that don't run JavaScript
 * (Bing, social previews, AI crawlers, link unfurlers) would see an empty page.
 * We render the real copy from constants.ts as plain semantic HTML inside #root;
 * React replaces it on mount, so humans never see it and both stay in sync.
 */
import { content, seo, SITE_URL } from '../constants';
import { services } from './services';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const plain = (s: string) => esc(s.replace(/\*/g, ''));
const list = (items: string[]) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;

const LINKS = {
  whatsapp: 'https://wa.me/5215569111742',
  linkedin: 'https://linkedin.com/in/manuelceomx',
  github: 'https://github.com/ideaspuff',
  youtube: 'https://youtube.com/c/manuelceo',
};

export function renderStaticContent(): string {
  const b = content.es.business;
  const t = content.es.tech;
  const card = (title: string, body: string) => `<article><h3>${esc(title)}</h3>${body}</article>`;

  const ecoCards = (c: typeof b.ecosystem.cards) =>
    [
      card(c.database.title, `<p>${esc(c.database.description)}</p>${list(c.database.items)}`),
      card(c.web.title, `<p>${esc(c.web.description)}</p>`),
      card(c.mobile.title, `<p>${esc(c.mobile.description)}</p>`),
      card(c.security.title, `<p>${esc(c.security.description)}</p>`),
      card(c.devops.title, `<p>${esc(c.devops.description)}</p>`),
      card(c.aiEng.title, `<p>${esc(c.aiEng.description)}</p>`),
      card(c.api.title, `<p>${esc(c.api.description)}</p>`),
    ].join('');

  const expCards = (x: typeof b.expertise) =>
    (['ai', 'cloud', 'dev'] as const).map((k) => card(x.cards[k].title, list(x.cards[k].items))).join('');

  return `
<div id="seo-content">
  <header>
    <p>${esc(b.hero.badge)}</p>
    <h1>Manuel Castellanos</h1>
    <p>${esc(seo.es.description)}</p>
    ${list(b.hero.phrases)}
    <nav aria-label="Secciones">
      <a href="#servicios">${esc(b.sections.expertise)}</a> ·
      <a href="#soluciones">${esc(b.sections.ecosystem)}</a> ·
      <a href="#contacto">${esc(b.sections.contact)}</a> ·
      <a href="/servicios/">Todos los servicios</a> ·
      <a href="${SITE_URL}/?lang=en" hreflang="en">English</a>
    </nav>
  </header>
  <main>
    <section><h2>${esc(b.sections.manifesto)}</h2><p>${plain(b.manifesto)}</p></section>
    <section id="servicios">
      <h2>${esc(b.expertise.title)} ${esc(b.expertise.titleHighlight)}</h2>
      <p>${esc(b.expertise.description)}</p>
      ${expCards(b.expertise)}
      <ul>${services.map((s) => `<li><a href="/servicios/${s.slug}/">${esc(s.name)}</a>: ${esc(s.short)}</li>`).join('')}</ul>
    </section>
    <section>
      <h2>${esc(t.expertise.title)} ${esc(t.expertise.titleHighlight)}</h2>
      <p>${esc(t.manifesto.replace(/\*/g, ''))}</p>
      ${expCards(t.expertise)}
    </section>
    <section id="soluciones">
      <h2>${esc(b.ecosystem.title)} ${esc(b.ecosystem.titleHighlight)}</h2>
      <p>${esc(b.ecosystem.description)}</p>
      ${ecoCards(b.ecosystem.cards)}
    </section>
    <section>
      <h2>${esc(t.ecosystem.title)} ${esc(t.ecosystem.titleHighlight)}</h2>
      ${ecoCards(t.ecosystem.cards)}
    </section>
    <section>
      <h2>${esc(b.stack.title)}</h2>
      <p>Next.js, React, TypeScript, Node.js, PostgreSQL, Supabase, Firebase, React Native, Gemini, GPT-4o, ElevenLabs, LangChain, Google Cloud, Azure, Cloudflare, Docker, Kubernetes, Terraform.</p>
    </section>
    <section id="contacto">
      <h2>${esc(b.contact.big)}</h2>
      <p>${esc(b.contact.description)}</p>
      <ul>
        <li><a href="mailto:${b.contact.emailBtn}">${esc(b.contact.emailBtn)}</a></li>
        <li><a href="${LINKS.whatsapp}">WhatsApp</a></li>
        <li><a href="https://t.me/${b.contact.telegramBtn.replace('@', '')}">Telegram ${esc(b.contact.telegramBtn)}</a></li>
        <li><a href="${LINKS.linkedin}">LinkedIn</a></li>
        <li><a href="${LINKS.github}">GitHub</a></li>
        <li><a href="${LINKS.youtube}">YouTube</a></li>
      </ul>
    </section>
  </main>
  <footer><p>${esc(b.footer.role)}. ${esc(b.footer.extra)}</p></footer>
</div>`;
}

export function renderJsonLd(): string {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Manuel Castellanos',
        url: `${SITE_URL}/`,
        image: `${SITE_URL}/og-image.png`,
        jobTitle: 'Arquitecto de IA y Cloud',
        description: seo.es.description,
        email: `mailto:${content.es.business.contact.emailBtn}`,
        address: { '@type': 'PostalAddress', addressCountry: 'MX' },
        knowsLanguage: ['es', 'en'],
        knowsAbout: [
          'Inteligencia artificial',
          'Agentes conversacionales',
          'Agentes de voz',
          'Automatización de procesos',
          'Arquitectura cloud',
          'Google Cloud',
          'Azure',
          'Cloudflare',
          'Desarrollo full stack',
          'React',
          'Next.js',
          'Node.js',
          'Transformación digital',
        ],
        sameAs: [LINKS.linkedin, LINKS.github, LINKS.youtube],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#service`,
        name: 'Manuel Castellanos · IA y Transformación Digital',
        url: `${SITE_URL}/`,
        image: `${SITE_URL}/og-image.png`,
        description: seo.es.description,
        founder: { '@id': `${SITE_URL}/#person` },
        areaServed: [{ '@type': 'Country', name: 'México' }, 'Latinoamérica', 'Estados Unidos'],
        availableLanguage: ['es', 'en'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicios',
          itemListElement: (['ai', 'cloud', 'dev'] as const).map((k) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: content.es.business.expertise.cards[k].title,
              description: content.es.business.expertise.cards[k].items.join('. '),
            },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: 'Manuel Castellanos',
        inLanguage: ['es-MX', 'en'],
        publisher: { '@id': `${SITE_URL}/#person` },
      },
    ],
  };
  return `<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`;
}

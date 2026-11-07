import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { renderStaticContent, renderJsonLd } from './seo/staticContent';
import { SITE_URL } from './constants';
import { services } from './seo/services';
import { renderServicePage, renderServicesIndex, renderLlmsTxt, renderLlmsFullTxt, serviceUrl, SERVICES_URL } from './seo/pages';

/** Injects crawlable HTML + structured data into index.html and emits sitemap.xml. */
const seoPlugin = () => ({
  name: 'seo-static-content',
  transformIndexHtml(html: string) {
    return html
      .replace('<!--seo:json-ld-->', renderJsonLd())
      .replace('<!--seo:content-->', renderStaticContent());
  },
  generateBundle(this: any) {
    // Static service pages (no JS needed) + AI-readable summaries
    this.emitFile({ type: 'asset', fileName: 'servicios/index.html', source: renderServicesIndex() });
    for (const s of services) {
      this.emitFile({ type: 'asset', fileName: `servicios/${s.slug}/index.html`, source: renderServicePage(s) });
    }
    this.emitFile({ type: 'asset', fileName: 'llms.txt', source: renderLlmsTxt() });
    this.emitFile({ type: 'asset', fileName: 'llms-full.txt', source: renderLlmsFullTxt() });

    const lastmod = new Date().toISOString().slice(0, 10);
    const alt = `
    <xhtml:link rel="alternate" hreflang="es" href="${SITE_URL}/?lang=es"/>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/?lang=en"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/"/>`;
    const url = (loc: string, priority: string) =>
      `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>${alt}\n  </url>`;
    const plain = (loc: string, priority: string) =>
      `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${url(`${SITE_URL}/`, '1.0')}
${url(`${SITE_URL}/?lang=es`, '0.9')}
${url(`${SITE_URL}/?lang=en`, '0.9')}
${plain(SERVICES_URL, '0.8')}
${services.map((s) => plain(serviceUrl(s), '0.8')).join('\n')}
</urlset>
`,
    });
  },
});

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), seoPlugin()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});

import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { renderStaticContent, renderJsonLd } from './seo/staticContent';
import { SITE_URL } from './constants';

/** Injects crawlable HTML + structured data into index.html and emits sitemap.xml. */
const seoPlugin = () => ({
  name: 'seo-static-content',
  transformIndexHtml(html: string) {
    return html
      .replace('<!--seo:json-ld-->', renderJsonLd())
      .replace('<!--seo:content-->', renderStaticContent());
  },
  generateBundle(this: any) {
    const lastmod = new Date().toISOString().slice(0, 10);
    const alt = `
    <xhtml:link rel="alternate" hreflang="es" href="${SITE_URL}/?lang=es"/>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/?lang=en"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/"/>`;
    const url = (loc: string, priority: string) =>
      `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>${alt}\n  </url>`;
    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${url(`${SITE_URL}/`, '1.0')}
${url(`${SITE_URL}/?lang=es`, '0.9')}
${url(`${SITE_URL}/?lang=en`, '0.9')}
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

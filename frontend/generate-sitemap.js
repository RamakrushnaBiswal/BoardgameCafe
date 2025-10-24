import { SitemapStream } from 'sitemap';
import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pages = [{ url: '/', changefreq: 'daily', priority: 1.0 }];
async function generateSitemap() {
  const writeStream = createWriteStream(
    path.resolve(__dirname, 'public', 'sitemap.xml')
  );
  const sitemap = new SitemapStream({
    hostname: 'https://play-cafe.vercel.app/',
  });
  sitemap.pipe(writeStream).on('finish', () => {
    console.log('Sitemap generated successfully');
  });
  pages.forEach((page) => sitemap.write(page));
  sitemap.end();
}
generateSitemap().catch((error) => {
  console.error('Error generating sitemap:', error);
});

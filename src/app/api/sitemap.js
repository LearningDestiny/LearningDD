const EXTERNAL_DATA_URL = 'https://learningdestiny.in';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${EXTERNAL_DATA_URL}</loc>
    </url>
    <url>
      <loc>${EXTERNAL_DATA_URL}/guide</loc>
    </url>
    ${posts
      .map(({ id }) => `
        <url>
          <loc>${EXTERNAL_DATA_URL}/posts/${id}</loc>
        </url>
      `)
      .join('')}
  </urlset>`;
}

export default async function handler(req, res) {
  try {
    const response = await fetch(`${EXTERNAL_DATA_URL}/api/posts`);
    const posts = await response.json();
    const sitemap = generateSiteMap(posts);

    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
}

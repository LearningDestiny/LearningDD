const EXTERNAL_DATA_URL = 'https://learningdestiny.in';

function generateSiteMap(posts = []) {
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

export async function getServerSideProps({ res }) {
  try {
    // Fetch posts data from the API
    const response = await fetch(`${EXTERNAL_DATA_URL}/api/posts`);
    const posts = await response.json();

    // Generate the sitemap
    const sitemap = generateSiteMap(posts);

    // Set response headers for XML
    res.setHeader('Content-Type', 'application/xml');
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error('Error generating sitemap:', error.message);

    // Fallback sitemap
    const fallbackSitemap = generateSiteMap([]);
    res.setHeader('Content-Type', 'application/xml');
    res.write(fallbackSitemap);
    res.end();
  }

  // No props needed since this is handled server-side
  return { props: {} };
}

export default function Sitemap() {
  return null; // Page is handled server-side
}

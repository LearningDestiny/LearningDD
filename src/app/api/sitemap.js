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

export default async function handler(req, res) {
  try {
    // Fetch posts data from the API
    const response = await fetch(`${EXTERNAL_DATA_URL}/api/posts`);
    const contentType = response.headers.get('content-type');

    // Validate response content type
    if (!response.ok || !contentType.includes('application/json')) {
      throw new Error(
        `Unexpected response: Status ${response.status}, Content-Type ${contentType}`
      );
    }

    // Parse the JSON data
    const posts = await response.json();

    // Generate the sitemap
    const sitemap = generateSiteMap(posts);

    // Set headers and send the sitemap
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error.message);

    // Send a fallback sitemap
    const fallbackSitemap = generateSiteMap([]);
    res.setHeader('Content-Type', 'application/xml');
    res.status(500).send(fallbackSitemap);
  }
}

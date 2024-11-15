import { NextResponse } from 'next/server';

const EXTERNAL_DATA_URL = 'https://learningdestiny.in';

async function generateSiteMap() {
  try {
    // Fetch data from your site's API
    const request = await fetch(`${EXTERNAL_DATA_URL}/api/posts`);
    const posts = await request.json();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- Main website URLs -->
      <url>
        <loc>${EXTERNAL_DATA_URL}</loc>
      </url>
      <url>
        <loc>${EXTERNAL_DATA_URL}/courses</loc>
      </url>
      <url>
        <loc>${EXTERNAL_DATA_URL}/about-us</loc>
      </url>
      <url>
        <loc>${EXTERNAL_DATA_URL}/events</loc>
      </url>
      <url>
        <loc>${EXTERNAL_DATA_URL}/workshops</loc>
      </url>
      <url>
        <loc>${EXTERNAL_DATA_URL}/internship</loc>
      </url>
      <url>
        <loc>${EXTERNAL_DATA_URL}/guide</loc>
      </url>
      ${posts.map(({ id }) => `
        <url>
          <loc>${`${EXTERNAL_DATA_URL}/posts/${id}`}</loc>
        </url>
      `).join('')}
    </urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'text/xml',
        // Add cache control headers if needed
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

export async function GET() {
  return generateSiteMap();
}
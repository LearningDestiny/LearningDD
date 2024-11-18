import { NextResponse } from 'next/server';

const EXTERNAL_DATA_URL = 'https://learningdestiny.in';

// Static routes with priorities and last modified dates
const staticRoutes = [
  { url: '/', priority: 1.00, lastmod: '2024-11-18' },
  { url: '/landing-page', priority: 0.80, lastmod: '2024-11-18' },
  { url: '/Courses', priority: 0.80, lastmod: '2024-11-18' },
  { url: '/AboutUs', priority: 0.80, lastmod: '2024-11-18' },
  { url: '/Events', priority: 0.80, lastmod: '2024-11-18' },
  { url: '/workshop', priority: 0.80, lastmod: '2024-11-18' },
  { url: '/inten', priority: 0.80, lastmod: '2024-11-18' },
  { url: '/sign-in', priority: 0.80, lastmod: '2024-11-18' },
  { url: '/Login', priority: 0.80, lastmod: '2024-11-18' },
  { url: '/Terms', priority: 0.80, lastmod: '2024-11-18' },
  { url: '/policy', priority: 0.80, lastmod: '2024-11-18' },
  { url: '/shipping', priority: 0.80, lastmod: '2024-11-18' },
  { url: '/cancallation', priority: 0.80, lastmod: '2024-11-18' }
];

function generateSiteMap(dynamicPosts = []) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
     ${staticRoutes
       .map(
         ({ url, priority, lastmod }) => `
     <url>
       <loc>${EXTERNAL_DATA_URL}${url}</loc>
       <lastmod>${lastmod}T07:18:06+00:00</lastmod>
       <priority>${priority.toFixed(2)}</priority>
     </url>`
       )
       .join('')}
     ${dynamicPosts
       .map(
         ({ id }) => `
     <url>
       <loc>${`${EXTERNAL_DATA_URL}/posts/${id}`}</loc>
       <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
       <priority>0.64</priority>
     </url>`
       )
       .join('')}
   </urlset>`;
}

export async function GET() {
  try {
    // Fetch dynamic posts from your API
    const response = await fetch(`${EXTERNAL_DATA_URL}/api/posts`);
    const posts = await response.json();

    // Generate the XML sitemap with both static and dynamic routes
    const sitemap = generateSiteMap(posts);

    // Return the generated sitemap with proper XML headers
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);

    // If API fetch fails, return sitemap with only static routes
    const fallbackSitemap = generateSiteMap([]);
    return new Response(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
      },
    });
  }
}

// Test the sitemap generation
const testSitemap = generateSiteMap([]);
console.log('Generated sitemap:', testSitemap);
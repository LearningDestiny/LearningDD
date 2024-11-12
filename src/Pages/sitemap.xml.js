const EXTERNAL_DATA_URL = 'https://learningdestiny.in';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Main website URLs -->
     <url>
       <loc>https://learningdestiny.in</loc>
     </url>
     <url>
       <loc>https://learningdestiny.in/guide</loc>
     </url>
     ${posts
       .map(({ id }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/posts/${id}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // The XML sitemap is generated on the server
}

export async function getServerSideProps({ res }) {
  try {
    // Fetch data from your site's API
    const request = await fetch(`${EXTERNAL_DATA_URL}/api/posts`);
    const posts = await request.json();

    // Generate XML sitemap with dynamic data
    const sitemap = generateSiteMap(posts);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  return {
    props: {},
  };
}

export default SiteMap;

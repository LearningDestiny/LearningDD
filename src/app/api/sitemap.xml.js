// pages/api/sitemap.xml.js

import { format } from 'date-fns';

export default function handler(req, res) {
  // Define the static pages of your site
  const staticPages = [
    { loc: 'https://learningdestiny.in', priority: 1.0 },  // Home page, higher priority
    { loc: 'https://learningdestiny.in/landing-page', priority: 0.8 },
    { loc: 'https://learningdestiny.in/courses', priority: 0.8 },
    { loc: 'https://learningdestiny.in/about-us', priority: 0.8 },
    { loc: 'https://learningdestiny.in/events', priority: 0.8 },
    { loc: 'https://learningdestiny.in/workshops', priority: 0.8 },
    { loc: 'https://learningdestiny.in/internships', priority: 0.8 },
    { loc: 'https://learningdestiny.in/sign-in', priority: 0.8 },
    { loc: 'https://learningdestiny.in/login', priority: 0.8 },
    { loc: 'https://learningdestiny.in/terms', priority: 0.8 },
    { loc: 'https://learningdestiny.in/privacy-policy', priority: 0.8 },
    { loc: 'https://learningdestiny.in/shipping-policy', priority: 0.8 },
    { loc: 'https://learningdestiny.in/cancellation-policy', priority: 0.8 },
  ];

  // Get the current date in ISO format
  const lastmod = format(new Date(), "yyyy-MM-dd'T'HH:mm:ssXXX");

  // Generate sitemap entries dynamically
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    ({ loc, priority }) => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>   <!-- Modify this if each page has different modification times -->
    <priority>${priority}</priority>
  </url>`
  )
  .join('')}
</urlset>`;

  // Set headers for XML response
  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(sitemap);
}

import { GetServerSideProps } from 'next'
import { IUrl } from 'WNTR/interfaces'
import axios from 'axios'
 
export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

function generateSiteMap(urls: IUrl[]) {
  return(`
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map(url => `
        <url>
          <loc>${url.loc}</loc>
          <lastmod>${url.lastmod}</lastmod>
          <changefreq>${url.changefreq}</changefreq>
          <priority>${url.priority}</priority>
        </url>
      `).join('')}
    </urlset>
  `)
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const api = axios.create({
        baseURL: process.env.API_HOST,
        headers: {
            'ApiKey': process.env.API_KEY
        }
    })
    const website = await api.get('/api/website')
    const sitemap = generateSiteMap(website.data.sitemap)

    res.setHeader('Content-Type', 'text/xml')
    res.write(sitemap)
    res.end()

    return { props: { } }
}
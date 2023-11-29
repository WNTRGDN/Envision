import { GetServerSideProps } from "next"
import axios from "axios"

export default function Robots() {
    // getServerSideProps will do the heavy lifting
}

function generateRobots(domain: string) {
    return(`
        User-Agent: *
        Allow: /

        Sitemap: ${domain}/sitemap.xml
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
    const robots = generateRobots(website.data.domain)

    res.setHeader('Content-Type', 'text/plain')
    res.write(robots)
    res.end()

    return { props: { } }
}
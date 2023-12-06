import { Html, Head, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '../utils/analytics'

const gtag = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? GA_TRACKING_ID : null

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${gtag}`} />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gtag}', { page_path: window.location.pathname });` }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
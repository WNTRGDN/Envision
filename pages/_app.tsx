import 'WNTR/styles/global.scss'
import { useState, useEffect, useContext, use } from 'react'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import Context from 'WNTR/utils/context'
import * as Analytics from 'WNTR/utils/analytics'
import { IPage, IWebsite } from 'WNTR/interfaces'

export default function App({ Component, pageProps }: AppProps) {
    
    const currentContext = useContext(Context)
    const router = useRouter()
    const [context, setContext] = useState({
      loading: false,
      website: {} as IWebsite,
      page: {} as IPage,
      setLoading,
      setWebsite,
      setPage
    })

    function setLoading(data: boolean) {
      context.loading = data
      setContext(Object.assign({}, context, context.loading))
    }

    function setWebsite(data: IWebsite) {
      context.website = data
      setContext(Object.assign({}, context, context.website))
    }

    function setPage(data: IPage) {
      context.page = data
      setContext(Object.assign({}, context, context.page))
    }
    
    useEffect(() => {

        router.events.on("routeChangeComplete", (url: URL) => Analytics.pageview(url, currentContext?.website?.gA4))
        router.events.on("routeChangeStart", () => context.setLoading(true))
        router.events.on("routeChangeComplete", () => context.setLoading(false))

        return () => {
          router.events.off("routeChangeComplete", (url: URL) => Analytics.pageview(url, currentContext?.website?.gA4))
        }
      }, [router.events, context])

    return (
        <Context.Provider value={context}>
            <Component {...pageProps} />
        </Context.Provider>
    )
}
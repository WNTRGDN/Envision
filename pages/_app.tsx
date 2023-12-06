import 'WNTR/styles/global.scss'
import { useState, useEffect, useContext, use } from 'react'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { useCookies } from 'react-cookie'
import { CookiesProvider } from 'react-cookie'
import ShoppingCart from '../utils/cart-context'
import Context from 'WNTR/utils/context'
import * as Analytics from 'WNTR/utils/analytics'
import { IPage, ISessionLineItem, IWebsite } from 'WNTR/interfaces'

export default function App({ Component, pageProps }: AppProps) {
    
    const router = useRouter()

    // website context
    const currentContext = useContext(Context)
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

    // shopping cart
    const [cookies, setCookie, removeCookie] = useCookies(['envision'])
    const [cart, setCart] = useState({
      items: [] as Array<ISessionLineItem>,
      state: false,
      add,
      remove,
      open,
      clear
    })

    function add(item: ISessionLineItem) {
      cart.items.push(item)
      setCart(Object.assign({}, cart, cart.items))
      setCookie('envision', cart.items, { path: '/' })
    }

    function remove(item: ISessionLineItem) {
      let index = cart.items.findIndex(d => d.product === item.product)
      cart.items.splice(index, 1)
      setCart(Object.assign({}, cart, cart.items))
      setCookie('envision', cart.items, { path: '/' })
    }

    function open() {
      cart.state = !cart.state
      setCart(Object.assign({}, cart, cart.state))
    }

    function clear() {
      //cart.items = []
      //setCart(Object.assign({}, cart, []))
      //setCookie('envision', [], { path: '/' })
    }
    
    useEffect(() => {

        router.events.on("routeChangeComplete", (url: URL) => Analytics.pageview(url, currentContext?.website?.gA4))
        router.events.on("routeChangeStart", () => context.setLoading(true))
        router.events.on("routeChangeComplete", () => context.setLoading(false))

        if (cookies.envision == undefined) {
          setCookie('envision', [], { path: '/' })
        } else {
          if (cookies.envision.length != cart.items.length) {
            setCart(Object.assign({}, cart, [] as Array<ISessionLineItem>))
            cookies.envision.forEach((product: ISessionLineItem) => cart.add(product))
          }
        }

        return () => {
          router.events.off("routeChangeComplete", (url: URL) => Analytics.pageview(url, currentContext?.website?.gA4))
        }
      }, [router.events, context])

    return (
      <ShoppingCart.Provider value={cart}>
        <CookiesProvider>
          <Context.Provider value={context}>
            <Component {...pageProps} />
          </Context.Provider>
        </CookiesProvider>
      </ShoppingCart.Provider>
    )
}
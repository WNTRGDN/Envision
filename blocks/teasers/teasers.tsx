import React, { FC, useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import { ICrops, ISessionLineItem } from 'WNTR/interfaces'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import ShoppingCart from 'WNTR/utils/cart-context'

const Teasers: FC<ITeasers> = (teasers) => {
    return (
        <article className={teasers.alias}>
            <Container>
                <Row>
                    {teasers.heading ?
                        <Col xs={12}>
                            <h2 className={`${teasers.alias}__heading`}>
                                {teasers.heading}
                            </h2>
                        </Col>
                    : null }
                    {teasers.pages.sort((a,b) => { return a.order - b.order }).map((item, index) =>
                        <Teaser key={index} {...item} alias={teasers.alias} />
                    )}
                </Row>
            </Container>
        </article>
    )
}

const Teaser: FC<ITeaser> = (item) => {

    var cart = useContext(ShoppingCart)
    var index = [] as ISessionLineItem[]

    const [added, setAdded] = useState(false)
    const product: ISessionLineItem = {
        product: item.product.product,
        price: item.product.price,
        quantity: item.product.quantity,
        recurring: item.product.recurring
    }

    const addToCart = () => {
        setAdded(true)
        cart.add(product)
    }

    const removeFromCart = () => {
        setAdded(false)
        cart.remove(product)
    }

    useEffect(() => {
        index = cart.items.filter((product: ISessionLineItem) => product.product == item.product.product)
        setAdded(index.length > 0)
    },[cart.items.length])

    return (
        <Col xs={12} sm={6} lg={4} xxl={3}>
            <div className={`${item.alias}__teaser`}>
                { item.image ? <Link href={item.link}><Image className={`${item.alias}__image`} src={item.crops.Thumbnail} /></Link> : null }
                <Link href={item.link}><h4 className={`${item.alias}__title`}>{item.title}</h4></Link>
                <div className={`${item.alias}__text`} dangerouslySetInnerHTML={{ __html: item.text }}></div>
                <div className={`${item.alias}__actions row`}>
                    <Col xs={12} md={6}>
                        <Link href={item.link} className="btn btn-danger w-100 text-white">See more</Link>
                    </Col>
                    <Col xs={12} md={6}>
                        {item.product.quantity == 1 ? <Button type="button" variant="danger" className="w-100" onClick={added ? removeFromCart : addToCart}>{added ? `Remove` : `Add to cart`}</Button> : null }
                    </Col>
                </div>
            </div>
        </Col>
    )
}

interface ITeasers {
    heading: string,
    pages: ITeaser[],
    type: string,
    alias: string
}

interface ITeaser {
    alias: string,
    crops: ICrops,
    image: string,
    link: string,
    order: number,
    product: ISessionLineItem
    text: string,
    title: string,
}

export default Teasers
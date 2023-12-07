import React, { FC, useState, useContext, useEffect } from 'react'
import { IProduct, ISessionLineItem } from '../../interfaces'
import { Container, Row, Col, Image, InputGroup, Button, Form } from 'react-bootstrap'
import ShoppingCart from '../../utils/cart-context'

const Product: FC<IProduct> = (product) => {

    var cart = useContext(ShoppingCart)
    var index = [] as ISessionLineItem[]

    const [added, setAdded] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const [total, setTotal] = useState(0)
    const item: ISessionLineItem = {
        product: product.id,
        price: product.defaultPriceId,
        quantity: quantity,
        recurring: product.defaultPrice.type === 'recurring'
    }

    const updateQuantity = (event: any) => {
        setQuantity(event.target.value < product.available ? event.target.value : product.available)
        setTotal(event.target.value * product.defaultPrice.unitAmountDecimal)
    }

    const addToCart = () => {
        setAdded(true)
        cart.add(item)
    }

    const removeFromCart = () => {
        setAdded(false)
        cart.remove(item)
    }

    useEffect(() => {
        index = cart.items.filter((item: ISessionLineItem) => item.product == product.id)
        setAdded(index.length > 0)
        setQuantity(added ? index[0]?.quantity : 0)
        setTotal((added ? index[0]?.quantity : quantity) * product.defaultPrice.unitAmountDecimal)
        console.log(total)
    },[cart.items.length])

    return (
        <article className={product.alias}>
            <Container>
                <Row>
                    <Col xs={12} lg={6}>
                        { product.images.map((image, index) => <Image key={index} className={`${product.alias}__image`} src={`${image}?mode=crop&width=500&height=500`} />) }
                    </Col>
                    <Col xs={12} lg={6}>
                        <h2 className={`${product.alias}__name`}>{product.name}</h2>
                        <p><small>Currently {product.available} in stock</small></p>
                        {!product.active || product.available < 1 ? <p><strong>Out of stock</strong></p> : null }
                        <InputGroup hidden={!product.active || product.available < 0} className={`${product.alias}__action`}>
                            <Form.Control type="number" min={1} max={product.available} placeholder="Qty" aria-label="Quantity" onChange={updateQuantity} disabled={added} value={ quantity } />
                            <InputGroup.Text>&times;</InputGroup.Text>
                            <InputGroup.Text>${product.defaultPrice.unitAmountDecimal.toFixed(2)}</InputGroup.Text>
                            <Button disabled={quantity < 1 || quantity > product.available} type="button" variant="danger" onClick={added ? removeFromCart : addToCart}>{added ? `Remove` : `Add to cart`}</Button>
                            <InputGroup.Text><strong>${(isNaN(total) ? 0 : total).toFixed(2)}</strong></InputGroup.Text>
                        </InputGroup>
                        <div className={`${product.alias}__text`} dangerouslySetInnerHTML={{ __html: product.details }}></div>
                        <p className={`${product.alias}__description`}>{product.description}</p>
                    </Col>
                </Row>
            </Container>
        </article>
    )
}

export default Product
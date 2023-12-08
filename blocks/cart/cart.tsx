import React, { FC, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { Loading } from 'WNTR/components'
import { IProduct, ISessionLineItem } from 'WNTR/interfaces'
import Image from 'next/image'
import { Container, Row, Col, Button, Form, InputGroup, Table } from 'react-bootstrap'
import ShoppingCart from 'WNTR/utils/cart-context'

const Cart: FC<ICart> = (block) => {

    const router = useRouter()
    const cart = useContext(ShoppingCart)
    const mode = cart.items.filter(x => { return x.recurring === true}).length ? 'subscription' : 'payment'
    const removeFromCart = (product: IProduct):void => {
        const index = block.products.indexOf(block.products.filter(block => { return block.id == product.id })[0])
        block.products.splice(index, 1)
    }
    const updateQuantity = (id: string, quantity: number):void => {
        const index = block.products.indexOf(block.products.filter(block => { return block.id == id })[0])
        block.products[index].quantity = quantity
    }

    return (
        <article className={block.alias}>
            <Container>
                <Row>
                    <Col xs={12}>
                        <h2 className={`${block.alias}__heading`}>Your Cart ({block.products.length} items)</h2>
                    </Col>
                </Row>
                <Row>
                    <Col className={`${block.alias}__cart`} xs={12} lg={8}>
                        {block.products.map((product: IProduct) => <Product {...product} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />)}
                    </Col>
                    <Col className={`${block.alias}__sidebar`} xs={12} lg={4}>
                        <Table borderless className={`${block.alias}__table`}>
                            <tbody>
                                <tr>
                                    <td className="fw-bold">Avaialble for pickup</td>
                                    <td>12/12/2023</td>
                                </tr>
                                <tr>
                                    <td className="fw-bold">Something else</td>
                                    <td>Lorem Ipsum</td>
                                </tr>
                                <tr>
                                    <td className="fw-bold">All products available</td>
                                    <td>Yes</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Total</td>
                                    <td>${block.products.reduce((total, a) => total + (a.defaultPrice.unitAmountDecimal * a.quantity), 0).toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </article>
    )
}

const Product: FC<IProduct> = (product) => {

    var cart = useContext(ShoppingCart)
    
    const component = 'wntrCartBlock'
    const [quantity, setQuantity] = useState(product.quantity)
    const [total, setTotal] = useState(product.quantity * product.defaultPrice.unitAmountDecimal)

    var index = {} as ISessionLineItem
    var item: ISessionLineItem = {
        product: product.id,
        price: product.defaultPriceId,
        quantity: quantity,
        recurring: product.defaultPrice.type === 'recurring'
    }

    const updateQuantity = (event: any) => {
        setQuantity(event.target.value)
        setTotal(event.target.value * product.defaultPrice.unitAmountDecimal)
        item.quantity = event.target.value
        cart.update(item)
        product.updateQuantity(product.id, event.target.value)
    }
    const removeFromCart = () => {
        cart.remove(item)
        product.removeFromCart(product)
    }

    useEffect(() => {
        index = cart.items.filter((item: ISessionLineItem) => item.product == product.id)[0]
    },[])

    

    return (
        <Row className={`${component}__product`} key={product.id}>
            <Col lg={2}>
                <Image className={`${component}__image`} src={product.images[0]} alt={`Image of ${product.name}`} width={500} height={500}></Image>
            </Col>
            <Col lg={6}>
                <p className="text-muted"><small>${product.defaultPrice.unitAmountDecimal.toFixed(2)} each</small></p>
                <h5>{product.name}</h5>
                <span>{product.description}</span>
            </Col>
            <Col lg={4} className={`${component}__product-actions`}>
                <InputGroup>
                    <Form.Control type="number" min={1} max={product.available} aria-label="Quantity" onChange={updateQuantity} placeholder={quantity.toString()} value={quantity} />
                    <InputGroup.Text><strong>${(isNaN(total) ? 0 : total).toFixed(2)}</strong></InputGroup.Text>
                    <Button disabled={product.quantity < 1 || product.quantity > product.available} type="button" variant="danger" onClick={removeFromCart}>&times;</Button>
                </InputGroup>
            </Col>
        </Row>
    )
}

interface ICart {
    type: string;
    alias: string;
    products: IProduct[];
    checkout: string;
}

export default Cart
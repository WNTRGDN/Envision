import React, { FC, useContext, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { Loading } from 'WNTR/components'
import { IProduct, ISessionLineItem } from 'WNTR/interfaces'
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import ShoppingCart from 'WNTR/utils/cart-context'

const Cart: FC<ICart> = (block) => {

    console.log(block)

    const router = useRouter()
    const cart = useContext(ShoppingCart)
    const mode = cart.items.filter(x => { return x.recurring === true}).length ? 'subscription' : 'payment'
    const removeFromCart = (product: IProduct) => {
        const index = block.products.indexOf(block.products.filter(block => { return block.id == product.id })[0])
        const item: ISessionLineItem = {
            product: product.id,
            price: product.defaultPriceId,
            quantity: 1,
            recurring: product.defaultPrice.type === 'recurring'
        }
        cart.remove(item)
        block.products.splice(index, 1)
    }
    const [submitting, setSubmitting] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [button, setButton] = useState(false)
    const handleNameChange = (input: string) => {
        setName(input)
        setButton(false)
        if (name && email && phone) {
            setButton(true)
        }
    }
    const handleEmailChange = (input: string) => {
        setEmail(input)
        setButton(false)
        if (name && email && phone) {
            setButton(true)
        }
    }
    const handlePhoneChange = (input: string) => {
        setPhone(input)
        setButton(false)
        if (name && email && phone) {
            setButton(true)
        }
    }
    const runCheckout  = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSubmitting(true)
        var data = {
            name: name,
            email: email,
            phone: phone
        }
        axios.post('/api/commerce/customers/search', data).then(customers => {
            if (customers.data.length) {
                proceedToCheckout(customers.data[0])
            }
            else {
                axios.post('/api/commerce/customers/create', data).then(cus => {
                    cart.clear()
                    proceedToCheckout(cus.data)
                })
            }
        })
    }
    const proceedToCheckout = async (customer: any) => {
        const model = {
            success_url: `${window.location.protocol}//${window.location.host}${block.checkout}?success=true`,
            cancel_url: `${window.location.protocol}//${window.location.host}${block.checkout}?success=true`,
            line_items: cart.items,
            mode: mode,
            customer: customer.id
        }
        axios.post('/api/commerce/checkout', model).then(checkout => { 
            setSubmitting(false)
            router.push(checkout.data.url)
        })
    }

    return (
        <article className={block.alias}>
            <Container>
                <Row>
                    <Col xs={12}>
                        <h2 className={`${block.alias}__heading`}>Your Cart ({block.products.length} items)</h2>
                    </Col>
                    <Col className={`${block.alias}__cart`} xs={12} lg={8}>
                        { block.products.map(product => 
                            <Row key={product.id} className={`${block.alias}__item`}>
                                <Col xs={2}>
                                    { product.images ? <Image src={`${product.images[0]}?mode=crop&width=300&height=300`} className={`${block.alias}__item-image`} /> : null }
                                </Col>
                                <Col xs={8}>
                                    <h4 className={`${block.alias}__item-name`}>{product.name} {product.defaultPrice.recurring ? `(subscription)` : null}</h4>
                                    <p className={`${block.alias}__item-description`}>{product.description}</p>
                                </Col>
                                <Col xs={2}>
                                    <p><strong>$ {product.defaultPrice.unitAmountDecimal.toFixed(2)}</strong></p>
                                </Col>
                                <Col xs={12}>
                                    <div className="wntrForm__field">
                                        <Button type="button" onClick={()=>removeFromCart(product)}>Remove</Button>
                                    </div>
                                </Col>
                            </Row>
                        ) }
                    </Col>
                    <Col xs={12} lg={4}>
                        { cart.items.length ?
                            <div className={`${block.alias}__summary`}>
                                <h3 className="mb-4">Summary</h3>
                                <table className={`${block.alias}__summary-table`}>
                                    <tbody>
                                        <tr>
                                            <td>Subtotal ({block.products.length} items)</td>
                                            <td>${block.products.reduce((total, a) => total + a.defaultPrice.unitAmountDecimal, 0).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td>Currency</td>
                                            <td>AUD</td>
                                        </tr>
                                        <tr>
                                            <td>Shipping & Handling</td>
                                            <td>$0.00</td>
                                        </tr>
                                        <tr>
                                            <td>Tax</td>
                                            <td>Included</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className={`${block.alias}__summary-table`}>
                                    <tbody>
                                        <tr>
                                            <td><h4>Total</h4></td>
                                            <td><h4>${block.products.reduce((total, a) => total + a.defaultPrice.unitAmountDecimal, 0).toFixed(2)}</h4></td>
                                        </tr>
                                    </tbody>
                                </table>                            
                                <Form className="wntrForm" onSubmit={runCheckout}>
                                    <Form.Group className="wntrForm__field" controlId="name">
                                        <Form.Label className="visually-hidden">Name</Form.Label>
                                        <Form.Control required type="text" placeholder="Name" name="name" onChange={e => handleNameChange(e.currentTarget.value)} />
                                    </Form.Group>
                                    <Form.Group className="wntrForm__field" controlId="email">
                                        <Form.Label className="visually-hidden">Email</Form.Label>
                                        <Form.Control required type="email" placeholder="Email" name="email" onChange={e => handleEmailChange(e.currentTarget.value)} />
                                    </Form.Group>
                                    <Form.Group className="wntrForm__field" controlId="phone">
                                        <Form.Label className="visually-hidden">Phone</Form.Label>
                                        <Form.Control required type="phone" placeholder="Phone" name="phone" onChange={e => handlePhoneChange(e.currentTarget.value)} />
                                    </Form.Group>
                                    <Button type="submit" className={`${block.alias}__summary-checkout`} disabled={!button}>Checkout</Button>
                                    { submitting ? <Loading position="absolute" top="0" background="transparent" /> : null }
                                </Form>
                            </div>
                        : null }
                    </Col>
                </Row>
            </Container>
        </article>
    )
}

interface ICart {
    type: string;
    alias: string;
    products: IProduct[];
    checkout: string;
}

export default Cart
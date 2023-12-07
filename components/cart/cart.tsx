import React, { FC, useContext, useState, useEffect } from 'react'
import Context from 'WNTR/utils/context'
import ShoppingCart from 'WNTR/utils/cart-context'
import { Offcanvas, ListGroup, Button } from 'react-bootstrap'
import axios from 'axios'
import { IProductLite, ISessionLineItem } from 'WNTR/interfaces'
import Link from 'next/link'

const Cart: FC = () => {

    const context = useContext(Context)
    const cart = useContext(ShoppingCart)
    const [show, setShow] = useState(false)
    const [items, setItems] = useState([] as IProductLite[])
    const handleClose = () => setShow(false)
    const handleRemove = (e: any) => {
        const item = cart.items.filter((item: ISessionLineItem) => item.product == e.target.dataset.id)
        cart.remove(item[0])
        init()
    }
    const init = () => {
        axios.post('/api/commerce/cart', cart.items).then(cart => { 
            setItems(cart.data)
        })
    } 

    useEffect(() => {
        setShow(true)
        init()
    },[cart.state])

    return(
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className="text-danger">Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {items.length ? 
                <ListGroup>
                    {items.map((item, index) => {
                        return (
                            <ListGroup.Item key={index}>
                                <div className="d-flex justify-content-between align-items-end">
                                    <small className="text-muted">{item.id}</small>
                                    <Button variant="link" size="sm" onClick={handleRemove} data-id={item.id}>&times;</Button>
                                </div>
                                <p className="mb-2"><strong>{item.name}</strong></p>
                                <div className="d-flex justify-content-between align-items-end">
                                    <small>{item.quantity} &times; ${item.amount}</small>
                                    <small className="text-danger"><strong>${(item.quantity*item.amount).toFixed(2)}</strong></small>
                                </div>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
                : <p>Your cart is empty</p> }
            </Offcanvas.Body>
            <Offcanvas.Header>
                <Link href={context.website.cartPage} className="btn btn-danger w-100" hidden={!cart.items.length || !context.website.cartPage} onClick={() => setShow(false)}>Proceed to Checkout</Link>
            </Offcanvas.Header>
        </Offcanvas>
    )
}

export default Cart;
import React, { FC, useContext, useState, useEffect } from 'react'
import ShoppingCart from 'WNTR/utils/cart-context'
import { Offcanvas, ListGroup, Button, Badge } from 'react-bootstrap'
import axios from 'axios'
import { IProductLite } from 'WNTR/interfaces'

const Cart: FC = () => {

    const cart = useContext(ShoppingCart)
    const [show, setShow] = useState(false)
    const [items, setItems] = useState([] as IProductLite[])
    const handleClose = () => setShow(false)

    const init = function() {
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
            <ListGroup>
                {items.map((item, index) => {
                    return (
                        <ListGroup.Item key={index}>
                            <div className="d-flex justify-content-between align-items-end">
                                <small className="text-muted">{item.id}</small>
                                <Button variant="link" size="sm">&times;</Button>
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
            </Offcanvas.Body>
            <Offcanvas.Header>
                <Button variant="danger" className="w-100">Proceed to Checkout</Button>
            </Offcanvas.Header>
        </Offcanvas>
    )
}

export default Cart;
import React, { FC, useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { IWebsite } from 'WNTR/interfaces'
import { Container, Navbar, Nav, Offcanvas, Button } from 'react-bootstrap'
import ShoppingCart from 'WNTR/utils/cart-context'

const Header: FC<IWebsite> = (website) => {
    const [scrolling, setScrolling] = useState(false)
    const cart = useContext(ShoppingCart)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.onscroll = () => setScrolling(window.scrollY !== 0)
        }
    }, [])

    let menu = website.menus.filter(m => m.title === "Main Menu")[0]
    
    menu.exists = menu !== undefined;

    return (
        <header className="header">
            <Navbar expand="lg" className={`header__navbar ${scrolling ? 'scrolling' : 'top'}`} fixed="top">
                <Container>
                    <Navbar.Brand as={Link} scroll={false} href="/" className="header__branding">
                        <img src={website.settings.logo} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
                    <Navbar.Offcanvas id="offcanvasNavbar-expand-lg" aria-labelledby="offcanvasNavbarLabel-expand-lg" placement="end">
                        <Offcanvas.Header closeButton>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="header__navigation justify-content-end flex-grow-1">
                            {menu.links.map((link, index) =>
                                <Nav.Item key={index} className="header__navigation-item text-right">
                                    <Nav.Link as={Link} scroll={false} eventKey={index} href={link.url}>{link.title}</Nav.Link>
                                </Nav.Item>
                            )}
                            {cart.items.length ? 
                                <Nav.Item key={999} className="header__navigation-item text-right">
                                    <Nav.Link as={Button} eventKey={999} onClick={cart.open}>Cart ({cart.items.length})</Nav.Link>
                                </Nav.Item>
                            : null}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
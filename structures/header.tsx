import React, { FC } from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import { IWebsite } from 'WNTR/interfaces'
import { Container, Row, Col, Ratio, Navbar, Nav, Offcanvas } from 'react-bootstrap';

const Header: FC<IWebsite> = (website) => {
    const router = useRouter()
    let menu = website.menus.filter(m => m.title === "Main Menu")[0]
    
    menu.exists = menu !== undefined;

    return (
        <header className="header">
            <Navbar expand="lg" className="header__navbar bg-body-tertiary mb-3">
                <Container fluid>
                    <Navbar.Brand href="/" className="header__branding">
                        <img src={website.settings.logo} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
                    <Navbar.Offcanvas id="offcanvasNavbar-expand-lg" aria-labelledby="offcanvasNavbarLabel-expand-lg" placement="end">
                        <Offcanvas.Header closeButton>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="header__navigation justify-content-end flex-grow-1">
                            {menu.links.map((link, index) =>
                                <Nav.Item key={index} className="header__navigation-item text-center">
                                    <Nav.Link as={Link} scroll={false} eventKey={index} href={link.url} className={router.asPath == link.url ? "active" : ""}>{link.title}</Nav.Link>
                                </Nav.Item>
                            )}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
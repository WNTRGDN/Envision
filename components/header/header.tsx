import React, { FC } from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import { IWebsite } from 'WNTR/interfaces'
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';

const Header: FC<IWebsite> = (website) => {
    let menu = website.menus.filter(m => m.title === "Main Menu")[0]
    
    menu.exists = menu !== undefined;

    return (
        <header className="header">
            <Navbar expand="lg" className="header__navbar bg-body-tertiary" fixed="top">
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
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
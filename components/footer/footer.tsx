import React, { FC } from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import moment from 'moment'
import { IFooter } from 'WNTR/interfaces'
import { Container, Row, Col, Ratio } from 'react-bootstrap';

const Footer: FC<IFooter> = (footer) => {
    let menu = footer.menus.filter(m => m.title === "Footer")[0]
    menu.exists = menu !== undefined;

    return (
        <footer className="footer">
            <Container>
                <Row className="pt-5 pb-4">
                    <Col xs={12} md={6} lg={4}>
                        <dl>
                        { footer.settings.phone ?
                            <>
                            <dt>Phone</dt>
                            <dd><a href={`tel:${footer.settings.phone}`}>{footer.settings.phone}</a></dd>
                            </>
                        : null }
                        { footer.settings.email ?
                            <>
                            <dt>Email</dt>
                            <dd><a href={`mailto:${footer.settings.email}`}>{footer.settings.email}</a></dd>
                            </>
                        : null }
                        { footer.settings.address ?
                            <>
                            <dt>Location</dt>
                            <dd>{footer.settings.address}</dd>
                            </>
                        : null }
                        </dl>
                        <small className="pt-3">&copy; {moment().year()} {footer.name}</small>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        { menu.exists ?
                            <div className="d-flex flex-column mb-3">
                                <h4>Learn more</h4>
                                {menu.links.map((link, index) => <Link key={index} href={link.url}>{link.title}</Link> )}
                            </div>
                        : null}
                    </Col>
                    <Col xs={12} lg={4}>
                        { footer.settings.openingHours.length ?
                            <dl>
                                <dt>Opening Hours</dt>
                                <dd>
                                    <div className="d-flex flex-column">
                                        {footer.settings.openingHours.sort((a,b) => { return a.order - b.order }).map((hour, index) => {
                                            return(
                                                <Row key={index}>
                                                    <Col>{hour.day}:</Col>
                                                    <Col>{hour.opening ? `${moment(new Date(hour.opening)).format('h:mm a')} - ${moment(new Date(hour.closing)).format('h:mm a')}` : 'Closed'}</Col>
                                                </Row>
                                            )
                                        })}
                                    </div>
                                </dd>
                            </dl>
                        : null}
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
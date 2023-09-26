import React, { FC } from 'react'
import ICards from './ICards'
import styles from './Cards.module.scss'
import Link from 'next/link'
import { Container, Row, Col, Image } from 'react-bootstrap'

const Cards: FC<ICards> = (cards) => {
    return (
        <article className={styles.wntrCardsBlock}>
            <Container>
                <Row>
                    <Col xs={12}>
                        <h2 className={styles.h2}>
                            {cards.heading}
                        </h2>
                    </Col>
                    {cards.items.map((item, index) =>
                        <Col xs={6} md={4} xl={3} key={index} className={styles.card}>
                            <Link href={item.link}>
                                <h3 className={styles.h3}>{item.title}</h3>
                                <Image src={`${item.image}?mode=crop&width=500&height=500`} thumbnail />
                            </Link>
                        </Col>
                    )}
                </Row>
            </Container>
        </article>
    )
}

export default Cards
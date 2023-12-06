import React, { FC } from 'react'
import Link from 'next/link'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { IBlock, ICrops } from 'WNTR/interfaces'

const Cards: FC<ICards> = (cards) => {
    return (
        <article className={cards.alias}>
            <Container>
                <Row>
                    {cards.heading ?
                        <Col xs={12}>
                            <h2 className={`${cards.alias}__heading`}>
                                {cards.heading}
                            </h2>
                        </Col>
                    : null }
                    {cards.items.map((item, index) =>
                        <Col xs={6} md={3} key={index}>
                            {item.link ?
                                <Link className={`${cards.alias}__card`} href={item.link} data-content={item.text}>
                                    <h3 className={`${cards.alias}__title`}>{item.title}</h3>
                                    <p className={`${cards.alias}__text visually-hidden`}>{item.text}</p>
                                    <Image className={`${cards.alias}__image`} src={item.crops.Thumbnail} />
                                </Link> :
                                <div className={`${cards.alias}__card`} data-content={item.text}>
                                    <h3 className={`${cards.alias}__title`}>{item.title}</h3>
                                    <p className={`${cards.alias}__text visually-hidden`}>{item.text}</p>
                                    <Image className={`${cards.alias}__image`} src={item.crops.Thumbnail} />
                                </div>
                            }
                        </Col>
                    )}
                </Row>
            </Container>
        </article>
    )
}

interface ICards extends IBlock {
    heading: string,
    items: ICard[]
}

interface ICard {
    image: string,
    link: string,
    text: string,
    title: string,
    crops: ICrops
}

export default Cards
import React, { FC } from 'react'
import { IBlock, IImageProps } from 'WNTR/interfaces'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image'

const Jumbotron: FC<IJumbotron> = (block) => {
    return (
        <article className={block.alias}>
            {block.imageProperties.crops ? 
                <Image
                className={`${block.alias}__background`}
                src={block.imageProperties.crops.Hero}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt="Envision Flooring" />
            : null }
            <Container className={`${block.alias}__container`}>
                <Row className={`${block.alias}__row`}>
                    <Col xs={12} className={`${block.alias}__col`}>
                        <div className={`${block.alias}__body`}>
                            <div className={`${block.alias}__content`} dangerouslySetInnerHTML={{ __html: block.richtext }}></div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </article>
    )
}

interface IJumbotron extends IBlock {
    image: string,
    richtext: string,
    imageProperties: IImageProps
}

export default Jumbotron
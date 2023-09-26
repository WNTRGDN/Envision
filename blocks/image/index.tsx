import React, { FC } from 'react'
import IImage from './IImage';
import { Container, Row, Col } from 'react-bootstrap';

const Image: FC<IImage> = (image) => {
    return (
        <article>
            <Container>
                <Row>
                    <Col>
                        <img className={`${image.alias}__image rounded wntr__shadow`} src={image.src} />
                    </Col>
                </Row>
            </Container>
        </article>
    )
}

export default Image
import React, { FC } from 'react'
import IText from './IText';
import { Container, Row, Col } from 'react-bootstrap';

const Text: FC<IText> = (text) => {
    return (
        <article>
            <Container>
                <Row>
                    <Col>
                        <div dangerouslySetInnerHTML={{ __html: text.richtext }}></div>
                    </Col>
                </Row>
            </Container>
        </article>
    )
}

export default Text
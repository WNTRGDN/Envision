import React, { FC } from 'react'
import { IBlock } from 'WNTR/interfaces'
import { Container, Row, Col } from 'react-bootstrap'

const Text: FC<IText> = (block) => {
    return (
        <article className={block.alias}>
            <Container>
                <Row>
                    <Col className={`${block.alias}__col`} dangerouslySetInnerHTML={{ __html: block.richtext }}></Col>
                </Row>
            </Container>
        </article>
    )
}

interface IText extends IBlock {
    richtext: string
}

export default Text
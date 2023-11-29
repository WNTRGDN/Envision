import React, { FC } from 'react'
import { IBlock } from 'WNTR/interfaces'
import { Container, Row, Col } from 'react-bootstrap'

const Jumbotron: FC<IJumbotron> = (block) => {
    console.log(block)
    return (
        <article className={block.alias}>
            <Container>
                <Row>
                    <p>JUmbs</p>
                </Row>
            </Container>
        </article>
    )
}

interface IJumbotron extends IBlock {
    image: string,
    richtext: string
}

export default Jumbotron
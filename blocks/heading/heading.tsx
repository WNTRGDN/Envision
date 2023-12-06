import React, { FC, useContext } from 'react'
import { IBlock } from 'WNTR/interfaces'
import { Container, Row, Col } from 'react-bootstrap'

const Heading: FC<IHeading> = (block) => {
    return (
        <article className={block.alias}>
            <Container className={`${block.alias}__container`}>
                <Row className={`${block.alias}__row`}>
                    <Col className={`${block.alias}__col`}>
                        {React.createElement(block.size.toLowerCase(), { className: `${block.alias}__heading ${block.alias}__${block.size.toLowerCase()}` }, block.text)}
                    </Col>
                </Row>
            </Container>
        </article>
    )
}

interface IHeading extends IBlock {
    text: string;
    size: string;
}

export default Heading
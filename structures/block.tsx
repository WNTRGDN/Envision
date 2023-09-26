import React, { FC } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Jumbotron } from 'WNTR/blocks'
import { IBlock } from 'WNTR/interfaces';

var controls: { [key: string]: any } = {
    Jumbotron: Jumbotron
};

const Block: FC<IBlock> = (block) => {
    const Block = controls[block.type]
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Block {...block} />
                </Col>
            </Row>
        </Container>
    )
}

export default Block
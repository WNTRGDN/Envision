import React, { FC } from 'react'
import { Row, Col } from 'react-bootstrap';
import { Alert } from 'WNTR/blocks'
import { IBlock } from 'WNTR/interfaces';

var controls: { [key: string]: any } = {
    Alert: Alert
};

const Block: FC<IBlock> = (block) => {
    const Block = controls[block.type]
    return (
        <Row>
            <Col>
                <Block {...block} />
            </Col>
        </Row>
    )
}

export default Block
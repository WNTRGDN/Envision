import React, { FC } from 'react'
import { IBlock } from 'WNTR/interfaces'
import { Block } from 'WNTR/components'
import { Container, Row, Col } from 'react-bootstrap'

const Split: FC<ISplit> = (split) => {

    const images = split.blocks.filter(x => x.type === 'Image').length === 2

    return (
        <article className={`${split.alias} ${split.inverted ? split.alias + `-inverted` : null} ${split.fullScreen ? split.alias + `-fullScreen` : null}` }>
            <Container>
                <Row className={`${split.alias}__row`}>
                    {split.blocks.length ? split.blocks.sort((a,b) => { return a.order - b.order }).map((block, index) => <Col data-type={block.type} key={index} xs={images ? 6 : 12} lg={6} className={`${split.alias}__col d-flex`}><Block {...block} /></Col>) : null}
                </Row>
            </Container>
        </article>
    )
}

interface ISplit extends IBlock {
    blocks: IBlock[];
    inverted: boolean;
    fullScreen: boolean;
}

export default Split
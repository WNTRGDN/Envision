import React, { FC } from 'react'
import { IBlock, ICrops } from 'WNTR/interfaces'
import { Container, Row } from 'react-bootstrap'

const Image: FC<IImage> = (block) => {
    const image = block.crop !== null && block.crop[0] !== null ? block.crops[block.crop[0] as keyof ICrops] : block.src
    return (
        <article className={`${block.alias} ${block.parallax ? block.alias + '-parallax' : null}`}>
            <Container fluid>
                <Row>
                    { block.parallax ?  <div className={`${block.alias}__parallax`} style={{ backgroundImage:`url(${image})`}}></div> : <img className={`${block.alias}__image`} src={image} /> }
                </Row>
            </Container>
        </article>
    )
}

interface IImage extends IBlock {
    src: string,
    crops: ICrops,
    crop: string[],
    parallax: boolean
}

export default Image
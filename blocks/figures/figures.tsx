import { IBlock } from 'WNTR/interfaces'
import React, { FC } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Figures: FC<IFigures> = (block) => {
    return (
        <article className={block.alias}>
            <Container>
                <Row>
                    <Col xs={12} hidden={!block.title}>
                        <h2 className={`${block.alias}__title`}>{block.title}</h2>
                    </Col>
                    <Col xs={12} hidden={!block.text} className={`${block.alias}__text`} dangerouslySetInnerHTML={{ __html: block.text }}></Col>
                    {block.items.map((item, index) => 
                        <Col key={index} className={`${block.alias}__figure`}>
                            <div className={`${block.alias}__amount`}>
                                <span className={`${block.alias}__amount ${block.alias}__amount-inner`} style={{ ['--p' as any]: item.amount}}>{item.amount}%</span>
                            </div>
                            <label className={`${block.alias}__label`}>{item.label}</label>
                        </Col>
                    )}
                </Row>
            </Container>
        </article>
    )
}

interface IFigures extends IBlock {
    title: string,
    text: string,
    items: IFigure[]
}

interface IFigure {
    label: string,
    amount: string
}

export default Figures
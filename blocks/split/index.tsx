import React, { FC } from 'react'
import ISplit from './ISplit'
import styles from './Split.module.scss'
import { Container, Row, Col } from 'react-bootstrap'
import { Block } from 'WNTR/structures'

const Split: FC<ISplit> = (split) => {
    return (
        <article className={styles.wntrSplitBlock}>
            <Container>
                <Row>
                    {split.blocks.length ? split.blocks.map((block, index) => <Col key={index} xs={12} md={6} className={`${split.alias}__col d-flex`}><Block {...block} /></Col>) : null}
                </Row>
            </Container>
        </article>
    )
}

export default Split
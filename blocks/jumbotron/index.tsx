import React, { FC } from 'react'
import styles from './Jumbotron.module.scss';
import IJumbotron from './IJumbotron';
import { Container, Row, Col } from 'react-bootstrap';

const Jumbotron: FC<IJumbotron> = (jumbotron) => {
    return (
        <article className={`${styles.jumbotron} ${jumbotron.image.length ? styles.hasImage : null}`} style={jumbotron.image.length ? { backgroundImage:`url(${jumbotron.image}?width=1800&height=900&mode=pad)` } : {}}>
            <Container className={styles.container}>
                <Row>
                    <Col className={styles.content} dangerouslySetInnerHTML={{ __html: jumbotron.richtext }}></Col>
                </Row>
            </Container>
        </article>
    )
}

export default Jumbotron
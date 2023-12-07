'use client' 
import React, { FC } from 'react'
import { useSearchParams } from 'next/navigation'
import { Container, Row, Col } from 'react-bootstrap'

const Checkout: FC<ICheckout> = (block) => {
    
    const searchParams = useSearchParams()
    const success = searchParams.get('success')    

    return (
        <article className={block.alias}>
            <Container>
                <Row>
                    <Col xs={12} lg={6} dangerouslySetInnerHTML={{__html: success ? block.successMessage : block.errorMessage }}></Col>
                </Row>
            </Container>
        </article>
    )
}

interface ICheckout {
    type: string;
    alias: string;
    successMessage: string;
    errorMessage: string;
}

export default Checkout
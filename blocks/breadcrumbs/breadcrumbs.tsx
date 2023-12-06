import React, { FC, useContext } from 'react'
import { IBlock } from 'WNTR/interfaces'
import { useRouter } from 'next/router'
import { Container, Row, Col } from 'react-bootstrap'
import Context from 'WNTR/utils/context'
import Link from 'next/link'

const Breadcrumbs: FC<IBreadcrumbs> = (block) => {

    const router = useRouter()
    const context = useContext(Context)

    return (
        <article className={block.alias}>
            <Container>
                <Row>
                    <Col xs={12} as="nav" aria-label="breadcrumb">
                        <ol className={`${block.alias}__breadcrumbs`}>
                            {context?.page?.breadcrumbs?.map(breadcrumb =>
                                <li className={`${block.alias}__breadcrumb`} key={breadcrumb.url}>
                                    <Link href={`${breadcrumb.url}`} className={`${block.alias}__breadcrumb-link`}>{breadcrumb.title}</Link>
                                </li>
                            )}
                        </ol>
                    </Col>
                </Row>
            </Container>
        </article>
    )
}

interface IBreadcrumbs extends IBlock {
}

export default Breadcrumbs
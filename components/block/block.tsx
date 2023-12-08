import React, { FC } from 'react'
import { Jumbotron, Text, Image, Split, Cards, Heading, Breadcrumbs, Teasers, Product, Cart, Checkout, Figures } from 'WNTR/blocks'
import { IBlock } from 'WNTR/interfaces'

var controls: { [key: string]: any } = {
    Jumbotron: Jumbotron,
    Text: Text,
    Image: Image,
    Split: Split,
    Cards: Cards,
    Heading: Heading,
    Breadcrumbs: Breadcrumbs,
    Teasers: Teasers,
    Product: Product,
    Cart: Cart, 
    Checkout: Checkout,
    Figures: Figures
}

const Block: FC<IBlock> = (block) => {
    if (controls[block.type] !== undefined){
        const Block = controls[block.type]
        return (
            <Block {...block} />
        )
    }
    return null
}

export default Block
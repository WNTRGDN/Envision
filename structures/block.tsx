import React, { FC } from 'react'
import { Jumbotron, Split, Image, Text, Cards } from 'WNTR/blocks'
import { IBlock } from 'WNTR/interfaces';

var controls: { [key: string]: any } = {
    Jumbotron: Jumbotron,
    Split: Split,
    Image: Image,
    Text: Text,
    Cards: Cards
};

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
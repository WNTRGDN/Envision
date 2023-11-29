import React, { FC } from 'react'
import { Jumbotron } from 'WNTR/blocks'
import { IBlock } from 'WNTR/interfaces'

var controls: { [key: string]: any } = {
    Jumbotron: Jumbotron
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
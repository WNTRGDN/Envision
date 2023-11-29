import React, { FC } from 'react'
import { Block } from 'WNTR/components'
import { IPage } from 'WNTR/interfaces'

const Main: FC<IPage> = (page) => {
    return (
        <main className="wntrBlocks">
            {page.blocks.length ? page.blocks.sort((a,b) => { return a.order - b.order }).map((block, index) => <Block key={index} {...block} />) : null}
        </main>
    )
}

export default Main
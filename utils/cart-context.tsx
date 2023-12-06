import { ISessionLineItem } from 'WNTR/interfaces'
import React from 'react'

const ShoppingCart = React.createContext({
  items: [] as Array<ISessionLineItem>,
  state: false,
  add: (item: ISessionLineItem) => {},
  remove: (item: ISessionLineItem) => {},
  open: () => {},
  clear: () => {}
})

export default ShoppingCart
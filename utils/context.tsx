import { IPage, IWebsite } from 'WNTR/interfaces'
import React from 'react'

const Context = React.createContext({
  loading: false,
  website: {} as IWebsite,
  page: {} as IPage,
  setWebsite: (website: IWebsite) => {},
  setPage: (page: IPage) => {}
})

export default Context
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { IProductLite, ISessionLineItem } from 'WNTR/interfaces'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = {
    'ApiKey': process.env.API_KEY
  }

  axios.post(process.env.API_HOST + '/api/commerce/cart', req.body, {
    headers: headers
  })
  .then((response) => {
    var output = [] as IProductLite[]
    response.data.map((product: IProductLite) => {
        const original = req.body.filter((item: ISessionLineItem) => item.product == product.id)
        product.quantity = Number(original[0].quantity)
        output.push(product)
    })
    
    res.status(200).json(output)
  })
  .catch((error) => {
    res.status(200).json(error)
  })
}

export default handler
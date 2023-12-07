import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = {
    'ApiKey': process.env.API_KEY,
    'StripeApiKey': process.env.STRIPE_API_KEY
  }

  axios.post(process.env.API_HOST + '/api/commerce/customer/search', req.body, {
    headers: headers
  })
  .then((response) => {
    res.status(200).json(response.data)
  })
  .catch((error) => {
    res.status(200).json(error)
  })
}

export default handler
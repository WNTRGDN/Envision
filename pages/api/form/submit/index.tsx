import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import FormData from 'form-data'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    let data = new FormData()

    Object.entries(req.body).forEach(([key, value]) => data.append(key, value))

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.API_HOST + '/api/forms/submit',
        headers: { 
            'Id': req.headers.id, 
            'ApiKey': process.env.API_KEY,
            ...data.getHeaders()
        },
        data : data
    }

    axios.request(config).then((response) => {
        res.status(200).json(response.data)
    }).catch((error) => {
        res.status(200).json(error)
    })

}

export default handler
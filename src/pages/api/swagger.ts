// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import swagger from './swagger.json'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const stringSwagger =  JSON.stringify(swagger)
  const result = stringSwagger.replace('string', 'String')
  res.status(200).json(swagger)
}

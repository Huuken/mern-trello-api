/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment'

let trelloDatabaseInstance = null

const client = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

//Connect to Database
export const CONNECT_DB = async () => {
  await client.connect()

  trelloDatabaseInstance = client.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to DB first')
  return trelloDatabaseInstance
}

export const CLOSE_DB = async () => {
  await client.close()
}
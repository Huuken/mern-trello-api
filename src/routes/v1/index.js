import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from './boardRoute'

const Router = express.Router()

//Check Status APIs v1
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ massage: 'APIs v1 are ready to use' })
})

// Board APIs
Router.use('/boards', boardRoute)

export const APIs_V1 = Router
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from './boardRoute'
import { columnRoute } from './columnRoute'
import { cardRoute } from './cardRoute'

const Router = express.Router()

//Check Status APIs v1
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ massage: 'APIs v1 are ready to use' })
})

// Board APIs
Router.use('/boards', boardRoute)

// Column APIs
Router.use('/columns', columnRoute)

// CArd APIs
Router.use('/cards', cardRoute)

export const APIs_V1 = Router
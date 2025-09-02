/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (data) => {
  try {
    //xu ly logic data
    const newBoard = {
      ...data,
      slug: slugify(data.title)
    }
    //Redirect den tang model
    const createdBoard = await boardModel.createNew(newBoard)
    //Get board
    const getNewBoard = await boardModel.findBoardById(createdBoard.insertedId)
    return getNewBoard
  } catch (error) {
    throw error
  }
}

const getDetails = async (boardId) => {
  try {

    //Redirect den tang model
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }
    return board
  } catch (error) {
    throw error
  }

}

export const boardService = {
  createNew,
  getDetails
}
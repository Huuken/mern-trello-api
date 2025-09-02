/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'

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

export const boardService = {
  createNew
}
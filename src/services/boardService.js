/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'

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

    const resBoard = cloneDeep(board)
    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })

    delete resBoard.cards

    return resBoard
  } catch (error) {
    throw error
  }
}

const update = async (boardId, reqBody) => {
  try {

    //Redirect den tang model
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedBoard = await boardModel.update(boardId, updateData)
    return updatedBoard
  } catch (error) {
    throw error
  }
}

const moveCardDifferentCol = async (reqBody) => {
  try {
    //Xoa card ra khoi column ban dau
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updateAt: Date.now()
    })

    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updateAt: Date.now()
    })

    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId
    })

    return { updateResult: 'Successfully!' }
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardDifferentCol
}
import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (data) => {
  try {
    //xu ly logic data
    const newColumn = {
      ...data
    }
    //Redirect den tang model
    const createdColumn = await columnModel.createNew(newColumn)
    //Get column
    const getNewColumn = await columnModel.findColumnById(createdColumn.insertedId)

    //...
    if(getNewColumn){
      getNewColumn.cards = []

      await boardModel.pushColumnOrderIds(getNewColumn)
    }

    return getNewColumn
  } catch (error) {
    throw error
  }
}

export const columnService = {
  createNew
}
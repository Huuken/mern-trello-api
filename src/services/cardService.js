import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (data) => {
  try {
    //xu ly logic data
    const newCard = {
      ...data
    }
    //Redirect den tang model
    const createdCard = await cardModel.createNew(newCard)
    //Get card
    const getNewCard = await cardModel.findCardById(createdCard.insertedId)

    //...
    if (getNewCard) {
      await columnModel.pushCardOrderIds(getNewCard)
    }

    return getNewCard
  } catch (error) {
    throw error
  }
}

export const cardService = {
  createNew
}
/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'

const createNew = async (data) => {
  try {
    //xu ly logic data
    const newBoard = {
      ...data,
      slug: slugify(data.title)
    }

    //Redirect den tang model

    return newBoard
  } catch (error) {
    throw error
  }

}

export const boardService = {
  createNew
}
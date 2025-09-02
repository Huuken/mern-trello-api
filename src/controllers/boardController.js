import { StatusCodes } from 'http-status-codes'
// import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  try {
    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'Test Error')
    res.status(StatusCodes.CREATED).json({ massage: 'POST from CONTROLLER: API create new board' })
  } catch (error) { next(error) }
}

export const boardController = {
  createNew
}
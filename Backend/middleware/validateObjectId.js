// Backend/middleware/validateObjectId.js

import mongoose from 'mongoose'

export const validateObjectId = (req, res, next) => {
  const { id } = req.params
  
  // Check if the id is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid paper ID format'
    })
  }
  
  next()
}

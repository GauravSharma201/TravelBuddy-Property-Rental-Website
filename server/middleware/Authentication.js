import user from '../model/userModel.js'
import jwt from 'jsonwebtoken'

export const authenticateUser = async (req, res, next) => {
  try {
    let { token } = req.cookies
    if (!token) {
      return res
        .status(401)
        .json({ message: `please login to access this resource` })
    }
    let decodedData = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await user.findById(decodedData.id)
    next()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// admin
export const authenticateAdmin = async (req, res, next) => {
  try {
    let { adminToken } = req.cookies
    if (!adminToken) {
      return res
        .status(401)
        .json({ message: `please login to access this resource` })
    }
    let decodedData = jwt.verify(adminToken, process.env.JWT_SECRET)
    req.user = await user.findById(decodedData.id)
    next()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const authenticateUserRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: `you are not authorize to access this resource` })
    }
    next()
  }
}

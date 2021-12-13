export const sendToken = (User, res, statusCode, message = '') => {
  let token = User.getJWToken()
  let options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    User,
    token,
    message,
  })
}

// admin
export const sendAdminToken = (User, res, statusCode, message = '') => {
  let adminToken = User.getJWToken()
  let options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }
  res.status(statusCode).cookie('adminToken', adminToken, options).json({
    success: true,
    User,
    adminToken,
    message,
  })
}

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1] // authorization: 'bearer token'
    if (!token) {
      throw new Error('nope')
    }
    const decodedToken = jwt.verify(token, 'secret_key')
    req.userData = { userId: decodedToken.userId }
    next()
  } catch (err) {
    const error = 'authentication failed in middleware'
    res.status(500).json({ message: error })
    return next(error)
  }
}

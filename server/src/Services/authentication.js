import jwt from 'jsonwebtoken'
import config from '../Config'

function createToken(payload) {
  return jwt.sign({ sub: payload }, config.secret, { expiresIn: '7d' })
}

function verifyToken(token) {
  return jwt.verify(token, config.secret)
}

export default { createToken, verifyToken }
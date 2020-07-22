import { AuthenticationError } from 'apollo-server-express'
import auth from '../Services/authentication'

const getUser = token => {
  try {
    if (token) {
      return auth.verifyToken(token)
    }
    return null
  } catch (err) {
    return null
  }
}

const context = ({ req }) => {
  const tokenWithBearer = req.headers.authorization || ''
  const token = tokenWithBearer.split(' ')[1]

  // try to retrieve a user with the token
  const user = getUser(token)
  // add the user to the context
  return { user };
}

export default context
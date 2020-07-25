import auth from '../Services/authentication'

const context = ({ req }) => {
  const tokenWithBearer = req.headers.authorization || ''
  const tokenSplited = tokenWithBearer.split(' ')[1]

  // try to retrieve a user with the token
  const token = getUser(tokenSplited)
  // add the user to the context
  return { token }
}

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

export default context

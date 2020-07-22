import { PrismaClient } from '@prisma/client'
import { AuthenticationError, ApolloError } from 'apollo-server'
import bcrypt from 'bcrypt'
import auth from '../../../Services/authentication'

const prisma = new PrismaClient()

export default {
  Query: {
    authentication: (_, data, { user }, info) => {
      if (!user) throw new AuthenticationError('You must be logged in')
      return 'You are authenticated!'
    }
  },
  Mutation: {
    signIn: async (_, { data }) => {
      //
      const userQuery = await prisma.user.findOne({
        where: {
          username: data.username
        }
      })
      //
      if (!bcrypt.compareSync(data.password, userQuery.password)) throw new ApolloError('Password Invalid!', '401')
      //
      const { password, ...payload } = userQuery
      const token = auth.createToken(payload)
      return { token }
    },
    signUp: async (_, { data }) => {
      //
      const password = await bcrypt.hashSync(data.password, 10)
      //
      const userQuery = await prisma.user.create({
        data: {
          ...data,
          password
        },
        select: {
          id: true,
          name: true,
          username: true,
          email: true
        }
      })
      const token = auth.createToken(userQuery)
      return { token }
    },
  }
}
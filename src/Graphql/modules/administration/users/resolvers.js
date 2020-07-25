import { PubSub } from 'apollo-server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const pubsub = new PubSub()
const prisma = new PrismaClient()

const USER_ADDED = 'USER_ADDED'

export default {
  Query: {
    users: async (parent, data, context, info) => {
      return await prisma.user.findMany()
    },
    user: async (_, { id }) => {
      return await prisma.user.findOne({
        where: {
          id: id
        }
      })
    }
  },
  Mutation: {
    createUser: async (_, { data }) => {
      const password = await bcrypt.hashSync(data.password, 10)
      const user = await prisma.user.create({
        data: {
          ...data,
          password
        }
      })
      pubsub.publish(USER_ADDED, { userAdded: user })
      return user
    },
    updateUser: async (_, { id, data }) => {
      return await prisma.user.update({
        where: { id: id },
        data: data
      })
    },
    deleteUser: async (_, { id }) => {
      const deleted = await prisma.user.delete(id)
      return !!deleted
    }
  },

  Subscription: {
    userAdded: {
      subscribe: () => pubsub.asyncIterator([USER_ADDED])
    }
  }
}

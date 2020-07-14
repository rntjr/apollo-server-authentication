import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const USER_ADDED = 'USER_ADDED'

export default {
  Query: {
    users: async () => {
      return await prisma.user.findMany()
    },
    user: async (_, { id }) => {
      return await prisma.user.findOne({
        where: {
          id: id
        }
      })
    },
  },
  Mutation: {
    createUser: async (_, { data }, { pubsub }) => {
      const user = await prisma.user.create({ data: data })
      pubsub.publish(USER_ADDED, { userAdded: user });
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
      subscribe: (obj, args, { pubsub }) => pubsub.asyncIterator([USER_ADDED])
    }
  }
}
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import USER_ADDED from './channels'

const prisma = new PrismaClient()

export default {
  Query: {

    users: async () => {
      await prisma.user.findMany()
    },

    user: async (_, { id }) => {
      await prisma.user.findOne({
        where: {
          id_: id
        }
      })
    }

  },
  Mutation: {

    createUser: async (_, { data }, { pubsub }) => {
      console.log(data)
      const { password, ...rest } = data
      const hashPassword = await bcrypt.hashSync(password, 10)
      const user = await prisma.user.create({
        data: {
          password: hashPassword,
          ...rest
        }
      })
      /* pubsub.publish(USER_ADDED, {
        userAdded: user
      }) */
      return user
    },

    updateUser: async (_, { id, data }) => {
      await prisma.user.update({
        where: { id_: id },
        data
      })
    },

    deleteUser: async (_, { id }) => {
      const deleted = await prisma.user.delete({ where: { id_: id } })
      return !!deleted
    }
  },
  Subscription: {
    userAdded: {
      subscribe: (obj, args, { pubsub }) => pubsub.asyncIterator(USER_ADDED)
    }
  }
}

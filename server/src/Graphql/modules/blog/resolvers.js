import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
  Query: {
    posts: async () => {
      return await prisma.post.findMany()
    },
    post: async (_, { id }) => {
      return await prisma.post.findOne({
        where: {
          id: id
        }
      })
    },
  },
  Mutation: {
    createPost: async (_, { data }) => {
      return await prisma.post.create(data)
    },
    updatePost: async (_, { id, data }) => {
      return await prisma.post.update(id, data)
    },
    deletePost: async (_, { id }) => {
      const deleted = await prisma.post.delete(id)
      return !!deleted
    }
  }
}
import startServer from './startServer'
import { typeDefs, context, resolvers } from './Graphql'

startServer({ typeDefs, resolvers, context })

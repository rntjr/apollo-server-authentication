import startServer from './startServer'
import typeDefs from './Graphql/typeDefs'
import resolvers from './Graphql/resolvers'

startServer({ typeDefs, resolvers })
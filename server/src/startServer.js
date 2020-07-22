import { ApolloServer } from 'apollo-server'

// Export server
export default function startServer({ typeDefs, resolvers, context }) {
  // ApolloServer declaration
  const server = new ApolloServer({ typeDefs, resolvers, context })
  // Up server
  server.listen().then(({ url }) => { console.log(`🚀  Server ready at ${url}`) })
}
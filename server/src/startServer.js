import { ApolloServer, PubSub } from 'apollo-server'

export default function startServer({ typeDefs, resolvers }) {
  const pubsub = new PubSub()
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { pubsub }
  })
  server.listen().then(({ url }) => console.log(` Server started at ${url}`))
}
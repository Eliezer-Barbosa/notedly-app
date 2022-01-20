const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

// run server on PORT from .env file or 4000
const port = process.env.PORT || 4000

// schema
const typeDefs = gql`
type Query {
    hello: String
}`

// resolver
const resolvers = {
    Query: {
        hello: () => 'Hello World'
    }
}

const app = express()

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers})

// Apply Apollo GraphQL middleware and set path to /api
server.applyMiddleware({ app, path: '/api' })

app.get('/', (req, res) => res.send('Hello World!'))

app.listen({ port }, () => console.log(`GraphQL server running at http://localhost:${port}${server.graphqlPath}`))
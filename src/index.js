const express = require("express");
const { ApolloServer } = require("apollo-server-express");
require("dotenv").config();

// Local module imports
const db = require("./db");
const models = require("./models");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// run server on PORT from .env file or 4000
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();

// connect to the DB
db.connect(DB_HOST);

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { models };
  },
});

// Apply Apollo GraphQL middleware and set path to /api
server.applyMiddleware({ app, path: "/api" });

app.get("/", (req, res) => res.send("Hello World!"));

app.listen({ port }, () =>
  console.log(
    `GraphQL server running at http://localhost:${port}${server.graphqlPath}`
  )
);

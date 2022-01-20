const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
require("dotenv").config();

const db = require("./db");
const models = require("./models");

// run server on PORT from .env file or 4000
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

// schema
const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }

  type Query {
    hello: String
    notes: [Note!]!
    note(id: ID!): Note!
  }

  type Mutation {
    newNote(content: String!): Note!
  }
`;

// resolver
const resolvers = {
  Query: {
    hello: () => "Hello World",
    notes: async () => {
      return await models.Note.find();
    },
    note: async (parent, args) => {
      return await models.Note.findById(args.id);
    },
  },
  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create({
        content: args.content,
        author: "Adam Scott",
      });
    },
  },
};

const app = express();

// connect to the DB
db.connect(DB_HOST);

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

// Apply Apollo GraphQL middleware and set path to /api
server.applyMiddleware({ app, path: "/api" });

app.get("/", (req, res) => res.send("Hello World!"));

app.listen({ port }, () =>
  console.log(
    `GraphQL server running at http://localhost:${port}${server.graphqlPath}`
  )
);

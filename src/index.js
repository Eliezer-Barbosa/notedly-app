const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
require("dotenv").config();

const db = require("./db");

// run server on PORT from .env file or 4000
const port = process.env.PORT || 4000;

const DB_HOST = process.env.DB_HOST;

let notes = [
  { id: "1", content: "This is a note", author: "Adam Scott" },
  { id: "2", content: "This is another note", author: "Harlow Everly" },
  { id: "3", content: "Oh hey look, another note!", author: "Riley Harrison" },
];

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
    notes: () => notes,
    note: (parent, args) => {
      return notes.find((note) => note.id === args.id);
    },
  },
  Mutation: {
    newNote: (parent, args) => {
      let notevalue = {
        id: String(notes.length + 1),
        content: args.content,
        author: "Adam Scott",
      };
      notes.push(notevalue);
      return notevalue;
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

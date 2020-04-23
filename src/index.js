const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
type Query {
  info: String!
  feed: [Link!]!
}

type Mutation {
  post(url: String!, description: String!): Link!
}

type Link {
  id: ID!
  description: String!
  url: String!
}

type Client {
  id: String!
  name: String!
  address: String!
  phone: String!
  interestLevel: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Query {
  Address(address: String): [Client!]!
  Client(id: ID): Client
  Clients(searchString: String): [Client!]!
}

type Mutation {
  AddClient(data: NewClient!): Client!
  NewClient(data: NewClient!, where: UniqueID!): Client
  ClientUpdate(data: UniqueID!, where: UniqueID!): Client
} 

AddClient {   
  id: String!
  name: String!
   address: String!
   phone: String!
   interestLevel: Int!
   createdAt: DateTime!
   updatedAt: DateTime!
 }
`;

let links = [
  {
    id: "0",
    url: "www.cliantclout.com",
    phone: "801.555.5555"
  }
];

let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `Testing for now`,
    feed: () => links
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    }
  },
  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));

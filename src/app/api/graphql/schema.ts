import { makeExecutableSchema } from "@graphql-tools/schema";

// Define los tipos GraphQL
const typeDefs = `
  type Query {
    hello: String
  }

  type Mutation {
    uploadFile(file: Upload!): String
  }
`;

// Define los resolvers
const resolvers = {
  Query: {
    hello: () => "Hello, world!",
  },
  Mutation: {
    uploadFile: async (_: any, { file }: { file: File }) => {
      // Maneja la carga de archivos aquí
      return `File uploaded: ${file.name}`;
    },
  },
};

// Crea el esquema ejecutable
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
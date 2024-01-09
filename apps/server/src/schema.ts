import { createSchema } from "graphql-yoga";

export const schema = createSchema({
  typeDefs: `
    type Query {
      hello: String
      world: String
    }
    type Mutation {
      registerSchool(registerInput: RegisterInput): School
    }
  `,
  resolvers: {
    Query: {
      hello: () => "world is here",
      world: () => "world is here",
    },
  },
});

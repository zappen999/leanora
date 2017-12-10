import { makeExecutableSchema } from 'graphql-tools'
import {
  types as querySchema,
  resolvers as queryResolvers,
} from './query'

import {
  types as mutationSchema,
  resolvers as mutationResolvers,
} from './mutation'

const schemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`

const combinedSchemas = [
  schemaDefinition,
  querySchema,
  mutationSchema,
]

const resolvers = {
  ...queryResolvers,
  ...mutationResolvers,
}

export const schema = makeExecutableSchema({
  typeDefs: combinedSchemas,
  resolvers,
})

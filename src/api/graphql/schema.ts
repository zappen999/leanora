import { makeExecutableSchema } from 'graphql-tools'
import * as deepmerge from 'deepmerge'
import * as glob from 'glob'
import { SchemaStitcher } from '../graphql/schemastitcher'

// import feature schema stitchers
import { stitcher as profileStitcher } from '../../features/profile'

// todo: clean these relative imports up
const stitchers = glob.sync('**/schema.ts')
  .map((filepath) => require('../../../' + filepath))
  // filter out non-stitchers
  .filter((mod) => !!mod.stitcher)
  .map((mod) => mod.stitcher as SchemaStitcher)

const QueryType = `
  type Query {
    dummy: String # dummy needed to not leave type empty...

    ${stitchers
      .filter((s) => !!s.queryDefinition)
      .map((s) => s.queryDefinition + '\n')}
  }
`

const MutationType = `
  type Mutation {
    dummy(dummy: String): String # dummy needed to not leave type empty...

    ${stitchers
      .filter((s) => !!s.mutationDefinition)
      .map((s) => s.mutationDefinition + '\n')}
  }
`

const resolvers = deepmerge.all(stitchers.map((s) => s.resolvers || {}))

export const schema = makeExecutableSchema({
  typeDefs: [
    QueryType,
    MutationType,
    ...stitchers.map((s) => s.types),
  ],
  resolvers: resolvers as any, // todo: use IResolvers from graphql-tools
})

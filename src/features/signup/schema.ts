import { SchemaStitcher } from '../../api/graphql/schemastitcher'
import Context from '../../context'

interface SignupArgs {
  email: string
  firstname?: string
  lastname?: string
  age?: number
}

async function signup(
  root: {}, // todo: define type
  args: SignupArgs,
  ctx: Context,
): Promise<boolean> {
  await ctx.signupFacade.signup(
    args.email,
    args.firstname,
    args.lastname,
    args.age,
  )

  return true
}

export const stitcher = new SchemaStitcher({
  mutationDefinition: `
    signup(
      email: String!
      firstname: String
      lastname: String
      age: Int
    ): Boolean
  `,
  types: () => [
  ],
  resolvers: {
    // Root mutation resolvers
    Mutation: {
      signup,
    },
  }
})

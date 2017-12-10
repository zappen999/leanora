import Context from '../../context'
import { MembershipAuthResponse } from '../../features/membership/facade'

const Mutation = `
  type Mutation {
    authenticate(
      # Identifier for the identity, can be email, username etc.
      identifier: String!
      # Password for the identity
      password: String!
    ): MembershipAuthResponse

    register(
      # Identifier for the identity, can be email, username etc.
      identifier: String!
      # Password for the identity
      password: String!
    ): MembershipAuthResponse
  }
`

interface AuthenticateArgs {
  identifier: string
  password: string
}

type RegisterArgs = AuthenticateArgs & {}

async function authenticate(
  root: {}, // todo: define type
  args: AuthenticateArgs,
  ctx: Context,
): Promise<MembershipAuthResponse> { // todo: define type
  return ctx.membership.authenticate(args.identifier, args.password)
}

async function register(
  root: {}, // todo: define type
  args: RegisterArgs,
  ctx: Context,
): Promise<MembershipAuthResponse> {
  return ctx.membership.register(args.identifier, args.password)
}

export const types = () => [Mutation]
export const resolvers = {
  Mutation: {
    authenticate,
    register,
  },
}

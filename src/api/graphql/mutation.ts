import Context from '../../context'
import { AuthIdentity } from '../../features/auth/factory'

const Mutation = `
  type Mutation {
    authenticate(
      # Identifier for the identity, can be email, username etc.
      id: String!
      # Password for the identity
      password: String!
    ): AuthIdentity

    register(
      # Identifier for the identity, can be email, username etc.
      id: String!
      # Password for the identity
      password: String!
    ): AuthIdentity
  }
`

interface AuthenticateArgs {
  id: string
  password: string
}

type RegisterArgs = AuthenticateArgs & {}

async function authenticate(
  root: {}, // todo: define type
  args: AuthenticateArgs,
  ctx: Context,
): Promise<{}> { // todo: define type
  return ctx.authFactory.authenticate(args.id, args.password)
}

async function register(
  root: {}, // todo: define type
  args: RegisterArgs,
  ctx: Context,
): Promise<AuthIdentity> {
  return ctx.authFactory.register(args.id, args.password)
}

export const types = () => [Mutation]
export const resolvers = {
  Mutation: {
    authenticate,
    register,
  },
}

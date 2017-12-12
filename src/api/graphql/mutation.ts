import Context from '../../context'
import {
  MembershipAuthResponse
} from '../../features/membership/facade'

import {
  Membership
} from '../../features/membership'

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

    changePassword(
      currentPassword: String!
      password: String!
    ): Membership
  }
`

interface AuthenticateArgs {
  identifier: string
  password: string
}

type RegisterArgs = AuthenticateArgs & {}
interface ChangePasswordArgs {
  currentPassword: string
  password: string
}

async function authenticate(
  root: {}, // todo: define type
  args: AuthenticateArgs,
  ctx: Context,
): Promise<MembershipAuthResponse> { // todo: define type
  return ctx.membershipFacade.authenticate(args.identifier, args.password)
}

async function register(
  root: {}, // todo: define type
  args: RegisterArgs,
  ctx: Context,
) {
  return ctx.membershipFacade.register(args.identifier, args.password)
}

async function changePassword(
  root: {}, // todo: define type
  args: ChangePasswordArgs,
  ctx: Context,
): Promise<Membership> {
  const membership = await ctx.membershipFacade.getCurrentMembership()

  return ctx.membershipFacade.changePassword(
    membership,
    args.currentPassword,
    args.password,
  )
}

export const types = () => [Mutation]
export const resolvers = {
  Mutation: {
    authenticate,
    register,
    changePassword,
  },
}

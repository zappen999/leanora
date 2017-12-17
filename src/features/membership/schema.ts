import { SchemaStitcher } from '../../api/graphql/schemastitcher'
import Context from '../../context'
import { Membership, MembershipAuthResponse } from './'

const MembershipType = `
  type Membership {
    identifier: String
  }
`

const MembershipAuthResponseType = `
  type MembershipAuthResponse {
    identifier: String
    token: String
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
): Promise<MembershipAuthResponse> {
  return ctx.membershipFacade.authenticate(args.identifier, args.password)
}

async function membershipResolver(
  root: {}, // todo: define type
  args: {},
  ctx: Context,
): Promise<Membership> {
  return await ctx.membershipFacade.getCurrentMembership() as Membership
}

async function register(
  root: {}, // todo: define type
  args: RegisterArgs,
  ctx: Context,
): Promise<MembershipAuthResponse> {
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

export const stitcher = new SchemaStitcher({
  // injects into Query type
  queryDefinition: `
    # Current authenticated membership, based on provided token
    membership: Membership
  `,
  // injects into Mutation type
  mutationDefinition: `
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
  `,
  types: () => [
    MembershipType,
    MembershipAuthResponseType,
  ],
  resolvers: {
    Query: {
      membership: membershipResolver,
    },
    Mutation: {
      authenticate,
      register,
      changePassword,
    }
  }
})

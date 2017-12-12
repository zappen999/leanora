import Context from '../../context'

import { types as membershipTypes,
  resolvers as membershipResolvers,
  Membership,
} from '../../features/membership'

import { types as profileTypes,
  resolvers as profileResolvers,
  Profile,
} from '../../features/profile'

const Query = `
  scalar Date

  type Query {
    # Current authenticated membership, based on provided token
    membership: Membership

    # Get current profile, based on provided token
    profile: Profile
  }
`

async function membership(
  root: {}, // todo: define type
  args: undefined,
  ctx: Context,
): Promise<Membership> {
  return await ctx.membershipFacade.getCurrentMembership() as Membership
}

async function profile(
  root: {}, // todo: define type
  args: undefined,
  ctx: Context,
): Promise<Profile> {
  return await ctx.profileFacade.getProfileFromMembership(
    await ctx.membershipFacade.getCurrentMembership()
  ) as Profile
}

export const resolvers = {
  Query: {
    membership,
    profile,
  },
  ...membershipResolvers,
  ...profileResolvers,
}

export const types = () => [
  Query,
  membershipTypes,
  profileTypes,
]

import Context from '../../context'

import { types as membershipTypes,
  resolvers as membershipResolvers,
  MembershipAuthResponse,
} from '../../features/membership'

const Query = `
  scalar Date

  type Query {
    # Current authenticated membership, based on provided token
    membership: MembershipAuthResponse
  }
`

function membership(
  root: {}, // todo: define type
  args: undefined,
  ctx: Context,
): MembershipAuthResponse {
  return ctx.membership.getCurrentMembership()
}

export const resolvers = {
  Query: {
    membership,
  },
  ...membershipResolvers,
}

export const types = () => [Query, membershipTypes]

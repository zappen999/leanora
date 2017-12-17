import { SchemaStitcher } from '../../api/graphql/schemastitcher'
import Context from '../../context'
import { Profile } from './'
import { stitcher as membershipStitcher } from '../membership'

const ProfileType = `
  type Profile {
    id: String
    username: String
    membership: Membership
  }
`

async function profile(
  root: {}, // todo: define type
  args: {},
  ctx: Context,
): Promise<Profile> {
  return await ctx.profileFacade.getProfileFromMembership(
    await ctx.membershipFacade.getCurrentMembership()
  ) as Profile
}

export const stitcher = new SchemaStitcher({
  // inject into Query type
  queryDefinition: `
    # Get current profile
    profile: Profile
  `,
  // export profile types and dependency types
  types: () => [
    ProfileType,
    membershipStitcher.types,
  ],
  // export resolvers
  resolvers: {
    Query: {
      profile,
    },
  },
})

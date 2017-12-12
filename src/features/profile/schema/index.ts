import { types as membershipTypes } from '../../membership/schema'

const Profile = `
  type Profile {
    id: String
    username: String
    membership: Membership
  }
`

export const types = () => [
  Profile,
  membershipTypes
]
export const resolvers = {}

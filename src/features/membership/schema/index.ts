const Membership = `
  type Membership {
    identifier: String
  }
`

const MembershipAuthResponse = `
  type MembershipAuthResponse {
    identifier: String
    token: String
  }
`

export const types = () => [
  Membership,
  MembershipAuthResponse
]
export const resolvers = {}

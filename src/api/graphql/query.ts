import Context from '../../context';

import {
  types as authTypes,
  resolvers as authResolvers,
  IAuthIdentity,
} from '../../features/auth';

const Query = `
  scalar Date

  type Query {
    # Current authenticated identity, based on provided token
    authIdentity: AuthIdentity
  }
`;

async function authIdentity(
  root,
  args,
  ctx: Context,
): Promise<IAuthIdentity> {
  return ctx.authFactory.getCurrentIdentity();
}

export const resolvers = {
  Query: {
    authIdentity,
  },
  ...authResolvers,
};

export const types = () => [Query, authTypes];

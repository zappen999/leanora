import Context from '../../context';

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
`;

interface IAuthenticateArgs {
  id: string;
  password: string;
}

type RegisterArgs = IAuthenticateArgs & {};

async function authenticate(
  root,
  args: IAuthenticateArgs,
  ctx: Context,
): Promise<any> {
  return ctx.authFactory.authenticate(args.id, args.password);
}

async function register(
  root,
  args: RegisterArgs,
  ctx: Context,
): Promise<any> {
  return ctx.authFactory.register(args.id, args.password);
}

export const types = () => [Mutation];
export const resolvers = {
  Mutation: {
    authenticate,
    register,
  },
};

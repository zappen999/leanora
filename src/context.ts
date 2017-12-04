import { AuthFactory, AuthConnector } from './features/auth';

export interface IContextFactory {
  authFactory: AuthFactory;
}

class Context implements IContextFactory {
  public authFactory: AuthFactory;

  constructor() {
    // setup connectors
    const authConnector = new AuthConnector();

    // setup factories
    this.authFactory = new AuthFactory(authConnector);
  }
}

export default Context;

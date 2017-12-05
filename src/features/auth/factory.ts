import * as DataLoader from 'dataloader';

export interface IAuthConnector {
  authenticate(id: string, password: string): Promise<IAuthIdentity>;
  register(id: string, password: string): Promise<IAuthIdentity>;
  authorize(token: string): Promise<IAuthIdentity>;
  loadBatch(ids: string[]): Promise<any>;
}

export interface IAuthIdentity {
  id: string;
  token: string;
}

export interface IIdentity {
  id: string;
  password: string;
}

// todo: implement nicer grants
export interface IGrant {
  domain: string;
  actions: string[];
}

export class AuthFactory {
  private connector: IAuthConnector;
  private authIdentity: IAuthIdentity;
  private loader;

  constructor(connector: IAuthConnector) {
    this.connector = connector;
    this.loader = new DataLoader(this.connector.loadBatch);
  }

  // Gets the current auth identity if token was provided and valid.
  // Check auth middlware for more details.
  public getCurrentIdentity(): IAuthIdentity {
    return this.authIdentity;
  }

  public authenticate(id: string, password: string): Promise<IAuthIdentity> {
    return this.connector.authenticate(id, password);
  }

  public register(id: string, password: string): Promise<IAuthIdentity> {
    return this.connector.register(id, password);
  }

  public async authorize(token: string): Promise<IAuthIdentity> {
    if (this.authIdentity) {
      return this.authIdentity;
    }

    try {
      // store the authorization for future use within this request context
      this.authIdentity = await this.connector.authorize(token);
      return this.authIdentity;
    } catch (err) {
      throw err;
    }
  }
}

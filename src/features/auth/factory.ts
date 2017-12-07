import * as DataLoader from 'dataloader'

export interface AuthConnector {
  authenticate(id: string, password: string): Promise<AuthIdentity>
  register(id: string, password: string): Promise<AuthIdentity>
  authorize(token: string): Promise<AuthIdentity>
  loadBatch(ids: string[]): Promise<[{}]> // todo: define type
}

export interface AuthIdentity {
  id: string
  token: string
}

export interface Identity {
  id: string
  password: string
}

// todo: implement nicer grants
export interface Grant {
  domain: string
  actions: string[]
}

export class AuthFactory {
  private connector: AuthConnector
  private authIdentity: AuthIdentity
  private loader: {} // todo: define type

  constructor(connector: AuthConnector) {
    this.connector = connector
    this.loader = new DataLoader(this.connector.loadBatch)
  }

  // Gets the current auth identity if token was provided and valid.
  // Check auth middlware for more details.
  public getCurrentIdentity(): AuthIdentity {
    return this.authIdentity
  }

  public authenticate(id: string, password: string): Promise<AuthIdentity> {
    return this.connector.authenticate(id, password)
  }

  public register(id: string, password: string): Promise<AuthIdentity> {
    return this.connector.register(id, password)
  }

  public async authorize(token: string): Promise<AuthIdentity> {
    if (this.authIdentity) {
      return this.authIdentity
    }

    try {
      // store the authorization for future use within this request context
      this.authIdentity = await this.connector.authorize(token)
      return this.authIdentity
    } catch (err) {
      throw err
    }
  }
}

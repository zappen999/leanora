import { AuthConnector, AuthIdentity, Identity, Grant } from './factory'
import * as jwt from 'jsonwebtoken'
import config from '../../config'

// todo: in-memory db until we know which database engine/structure we want
const identities: Identity[] = []

export interface TokenData {
  id: string
  grants: Grant[]
}

export class AuthConnector implements AuthConnector {
  public async authenticate(id: string, password: string): Promise<AuthIdentity> {
    // todo: replace with real mechanism to authenticate this identity
    const identity = identities
      .find((i) => i.id === id && i.password === password)

    if (!identity) {
      throw new Error('Invalid id or password')
    }

    // user was authenticated correctly, sign a token

    const tokenData: TokenData = {
      id: identity.id,
      grants: [],
    }
    const token = await this.signJWT(
      tokenData,
      config.auth.ttl,
      config.auth.secret,
    )

    return {
      id: identity.id,
      token,
    }
  }

  public authorize(token: string): Promise<AuthIdentity> {
    return this.verifyJWT(token, config.auth.secret)
  }

  // todo: implement real register funtionality
  public async register(id: string, password: string): Promise<AuthIdentity> {
    const identity: Identity = {
      id,
      password,
    }

    identities.push(identity)

    return this.authenticate(id, password)
  }

  public async loadBatch(ids: string[]): Promise<{}> {
    return []
  }

  protected async verifyJWT(
    token: string,
    secret: string,
  ): Promise<AuthIdentity> {
    return new Promise<AuthIdentity>((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded: AuthIdentity) => {
        if (err) {
          return reject(err)
        }

        decoded.token = token
        return resolve(decoded)
      })
    })
  }

  protected async signJWT(
    data: TokenData,
    expiresIn: string,
    secret: string,
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      jwt.sign(data, secret, { expiresIn }, (err, token) => {
        if (err) {
          return reject(err)
        }

        return resolve(token)
      })
    })
  }
}

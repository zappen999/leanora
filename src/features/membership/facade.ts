import * as jwt from 'jsonwebtoken'
import config from '../../config'
import { Membership } from './entities/membership'

export interface TokenContents {
  identifier: string
}

export interface MembershipAuthResponse extends TokenContents {
  token: string
}

export class MembershipFacade {
  protected lastAuthorizedMembershipResponse: MembershipAuthResponse

  public getCurrentMembership(
  ): MembershipAuthResponse {
    return this.lastAuthorizedMembershipResponse
  }

  public async authenticate(
    identifier: string, password: string
  ): Promise<MembershipAuthResponse> {
    const membership = await Membership.findOne({ identifier })

    if (!membership) {
      throw new Error('Invalid identifier or password')
    }

    if (!await membership.matchPasswordHash(password)) {
      throw new Error('Invalid identifier or password')
    }

    const tokenData: TokenContents = {
      identifier: membership.identifier
    }
    const token = await this.signJWT(
      tokenData,
      config.auth.ttl,
      config.auth.secret,
    )

    return {
      identifier: membership.identifier,
      token
    }
  }

  public async authorize(token: string): Promise<MembershipAuthResponse> {
    const tokenData = await this.verifyJWT(token, config.auth.secret)
    this.lastAuthorizedMembershipResponse = {
      identifier: tokenData.identifier,
      token
    }

    return this.lastAuthorizedMembershipResponse
  }

  public async register(
    identifier: string,
    password: string,
  ): Promise<MembershipAuthResponse> {
    const membership = new Membership()
    membership.identifier = identifier
    await membership.setPassword(password)
    await membership.save() // should throw if identifier exists already

    return {
      identifier: membership.identifier,
      token: await this.signJWT(
        { identifier: membership.identifier },
        config.auth.ttl,
        config.auth.secret
      ),
    }
  }

  protected async verifyJWT(
    token: string,
    secret: string,
  ): Promise<TokenContents> {
    return new Promise<TokenContents>((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded: TokenContents) => {
        if (err) {
          return reject(err)
        }

        return resolve(decoded)
      })
    })
  }

  protected async signJWT(
    data: TokenContents,
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

import * as jwt from 'jsonwebtoken'
import config from '../../config'
import { Membership } from './entities/membership'
import { Profile } from '../profile/entities/profile'
import { MembershipFactory } from './'
import { ProfileFactory } from '../profile'

export interface TokenContents {
  identifier: string
}

export interface MembershipAuthResponse extends TokenContents {
  token: string
}

export class MembershipFacade {
  protected lastAuthorizedMembershipResponse: MembershipAuthResponse

  public getCurrentMembership = async (): Promise<Membership> => {
    if (!this.lastAuthorizedMembershipResponse) {
      throw new Error('Authentication required')
    }

    return await Membership.findOne({
      identifier: this.lastAuthorizedMembershipResponse.identifier
    }) as Membership
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

  public authorize = async (token: string): Promise<MembershipAuthResponse> => {
    const tokenData = await this.verifyJWT(token, config.auth.secret)
    this.lastAuthorizedMembershipResponse = {
      identifier: tokenData.identifier,
      token
    }

    return this.lastAuthorizedMembershipResponse
  }

  public changePassword = async (
    membership: Membership|null,
    oldPassword: string,
    newPassword: string
  ): Promise<Membership> => {
    if (membership == null) {
      throw new Error('Authorization required')
    }

    // check if provided password matches
    await this.authenticate(
      membership.identifier,
      oldPassword,
    )

    await membership.setPassword(newPassword)
    await membership.save()

    return membership
  }

  public register = async (
    identifier: string,
    password: string
  ): Promise<MembershipAuthResponse> => {
    const membership = await MembershipFactory.create(
      identifier,
      password,
    )
    await membership.save()

    const profile = ProfileFactory.createFromMembership(membership)
    await profile.save()

    return this.authenticate(identifier, password)
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

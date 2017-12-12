import { Profile } from './entities/profile'
import { getRepository } from 'typeorm'
import { Membership } from '../membership/entities/membership'

export class ProfileFacade {
  public getProfileFromMembership(membership: Membership) {
    if (membership == null) {
      return null
    }

    return getRepository(Profile)
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.membership', 'membership')
      .where('membership.identifier = :identifier', {
        identifier: membership.identifier
      })
      .getOne()
  }
}

import { Profile } from './entities/profile'
import { getRepository } from 'typeorm'
import { Membership } from '../membership/entities/membership'
import * as DataLoader from 'dataloader'

export class ProfileFacade {
  protected byIdLoader: DataLoader<number, Profile>

  constructor() {
    this.byIdLoader = new DataLoader(this.getBatchProfileByIds)
  }

  public getProfileFromMembership(membership: Membership): Promise<Profile|undefined> {
    return getRepository(Profile)
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.membership', 'membership')
      .where('membership.identifier = :identifier', {
        identifier: membership.identifier
      })
      .getOne()
  }

  public getProfileById(id: number): Promise<Profile> {
    return this.byIdLoader.load(id)
  }

  // todo: for ids that doesnt get found, we should provide null in the keys place
  protected getBatchProfileByIds(ids: {}) {
    return getRepository(Profile)
      .createQueryBuilder('profile')
      .where('profile.id IN(:ids)')
      .setParameter('ids', ids)
      .getMany()
  }
}

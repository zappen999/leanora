import { Profile } from './entities/profile'
import { getRepository } from 'typeorm'
import { Membership } from '../membership/entities/membership'
import * as DataLoader from 'dataloader'

export class ProfileFacade {
  protected byIdLoader: DataLoader<number, Profile|null>

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

  public getProfileById(id: number): Promise<Profile|null> {
    return this.byIdLoader.load(id)
  }

  protected async getBatchProfileByIds(ids: number[]) {
    const profiles = await getRepository(Profile)
      .createQueryBuilder('profile')
      .where('profile.id IN(:ids)')
      .setParameter('ids', ids)
      .getMany()

    // make sure that keys that is not found gets null as value
    return ids.map((id) => profiles.find((item) => item.id === id) || null)
  }
}

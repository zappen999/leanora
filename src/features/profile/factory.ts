import { Profile } from './entities/profile'
import { Membership } from '../membership/entities/membership'

export class ProfileFactory {
  public static createFromMembership(membership: Membership): Profile {
    const profile = new Profile()
    profile.membership = membership
    profile.username = membership.identifier
    return profile
  }
}

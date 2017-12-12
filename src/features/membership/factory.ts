import { Membership } from './entities/membership'

export abstract class MembershipFactory {
  public static async create(
    identifier: string,
    password: string
  ): Promise<Membership> {
    const membership = new Membership()
    membership.identifier = identifier
    await membership.setPassword(password)
    return membership
  }
}

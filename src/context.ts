import {
  MembershipFacade,
  MembershipFactory,
} from './features/membership'

import {
  ProfileFacade,
  ProfileFactory,
} from './features/profile'

export interface ContextFacade {
  membershipFacade: MembershipFacade
  membershipFactory: MembershipFactory
  profileFacade: ProfileFacade
  profileFactory: ProfileFactory
}

class Context implements ContextFacade {
  public membershipFacade: MembershipFacade
  public membershipFactory: MembershipFactory
  public profileFacade: ProfileFacade
  public profileFactory: ProfileFactory

  constructor() {
    // setup facades
    this.membershipFacade = new MembershipFacade()
    this.membershipFactory = MembershipFactory
    this.profileFacade = new ProfileFacade()
    this.profileFactory = ProfileFactory
  }
}

export default Context

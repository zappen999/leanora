import { MembershipFacade } from './features/membership'
import { ProfileFacade } from './features/profile'
import { BlogFacade } from './features/blog'

export interface ContextFacade {
  membershipFacade: MembershipFacade
  profileFacade: ProfileFacade
  blogFacade: BlogFacade
}

class Context implements ContextFacade {
  public membershipFacade: MembershipFacade
  public profileFacade: ProfileFacade
  public blogFacade: BlogFacade

  constructor() {
    // setup facades
    this.membershipFacade = new MembershipFacade()
    this.profileFacade = new ProfileFacade()
    this.blogFacade = new BlogFacade()
  }
}

export default Context

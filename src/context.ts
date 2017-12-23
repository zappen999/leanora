import { MembershipFacade } from './features/membership'
import { ProfileFacade } from './features/profile'
import { BlogFacade } from './features/blog'
import { SignupFacade } from './features/signup'

export interface ContextFacade {
  membershipFacade: MembershipFacade
  profileFacade: ProfileFacade
  blogFacade: BlogFacade
  signupFacade: SignupFacade
}

class Context implements ContextFacade {
  public membershipFacade: MembershipFacade
  public profileFacade: ProfileFacade
  public blogFacade: BlogFacade
  public signupFacade: SignupFacade

  constructor() {
    // setup facades
    this.membershipFacade = new MembershipFacade()
    this.profileFacade = new ProfileFacade()
    this.blogFacade = new BlogFacade()
    this.signupFacade = new SignupFacade()
  }
}

export default Context

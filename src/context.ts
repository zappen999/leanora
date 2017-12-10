import { MembershipFacade } from './features/membership'

export interface ContextFacade {
  membership: MembershipFacade
}

class Context implements ContextFacade {
  public membership: MembershipFacade

  constructor() {
    // setup facades
    this.membership = new MembershipFacade()
  }
}

export default Context

import Importer = require('@sendgrid/contact-importer')
import * as Sendgrid from 'sendgrid'
import env from '../../env'
import logger from '../../utils/logging'

// the sendgrid contact importer should live globally to be able to queue
// up and send signups from multiple requests. Sendgrid has a strict rate
// limiting for creating new 'contacts' in their lists (3 st per 2 seconds).
// todo: update this when sendgrid have implemented their sub packages.
//
// Note that this importer will import the signups to a global contact list.
// There is no way of signing up a contact directly to a list. It's a two
// step process: 1, sign up the contact, 2, assign the contact to the list.
// Make sure you have a clean Sendgrid account for each service, to not mix
// up the signups.
//
// Alternativly, you can hook into the .once('success') event and move the
// created contacts into the correct list.
const sg = Sendgrid(env.sendgridApiKey) as {}
const contactImporter = new Importer(sg)

contactImporter.on('success', (result, batch) => {
  logger.info('Successfully imported signup batch', {
    result,
    batch,
  })
})

contactImporter.on('error', (err: Error, batch) => {
  logger.info('Error when importing signup batch', {
    err,
    batch,
  })
})

export class SignupFacade {
  public signup(
    email: string,
    firstname?: string,
    lastname?: string,
    age?: number,
  ): void {
    contactImporter.push({
      email,
      first_name: firstname,
      last_name: lastname,
      age,
    })
  }
}

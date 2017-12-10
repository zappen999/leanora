import 'reflect-metadata'
import { createConnection } from 'typeorm'
import logger from '../utils/logging'

createConnection().then((connection) => {
  logger.info('Connected to database')
}).catch((err) => {
  logger.error('Error connecting to database', err)
})

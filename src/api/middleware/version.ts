import { Context as KoaContext } from 'koa'
import config from '../../config'

// Provide server version in response headers
export function version(ctx: KoaContext, next: () => Promise<{}>) {
  ctx.set('X-Server-Version', config.app.version)
  return next()
}

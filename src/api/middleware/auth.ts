import { Context as KoaContext } from 'koa'
import Context from '../../context'

// Tries to authorize this request. It's up the the next middleware
// to decide what to do in unauthorized cases.
export async function tryAuth(ctx: KoaContext, next: () => Promise<{}>) {
  const token = ctx.get('Authorization')

  if (!token) {
    return next()
  }

  const contextFactory = ctx.state.contextFactory as Context

  try {
    await contextFactory.authFactory.authorize(token)
  } catch (err) {
    return next()
  }

  return next()
}

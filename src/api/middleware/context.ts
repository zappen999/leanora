import { Context as KoaContext } from 'koa'
import Context from '../../context'

export async function injectContext(
  ctx: KoaContext, next: () => Promise<{}>
) {
  ctx.state.contextFacade = new Context()
  return next()
}

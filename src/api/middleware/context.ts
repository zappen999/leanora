import { Context as KoaContext } from 'koa';
import Context from '../../context';

export async function injectContext(ctx: KoaContext, next: () => Promise<any>) {
  ctx.state.contextFactory = new Context();
  return next();
}

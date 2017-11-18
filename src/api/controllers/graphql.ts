import { Context as KoaContext, Middleware } from 'koa';
import * as Router from 'koa-router';
import env from 'env';
import {
  graphqlKoa,
  graphiqlKoa,
} from 'apollo-server-koa';
import { schema } from '../graphql/schema';
import Context from 'context';

const router = new Router();

if (env.isDev()) {
  router.get('/', graphiqlKoa({ endpointURL: '/v1/graphql' }));
}

router.post('/', async (ctx: KoaContext, next: Middleware) => {
  await graphqlKoa({
    schema,
    context: ctx.state.contextFactory as Context,
  })(ctx, next);
});

export default router;

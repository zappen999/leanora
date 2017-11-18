import * as Router from 'koa-router';
import gqlRouter from './graphql';
import healthRouter from './health';

const router = new Router();

// new controllers goes here
router
  .use('/v1/graphql', gqlRouter.routes(), gqlRouter.allowedMethods())
  .use('/v1/health', healthRouter.routes(), healthRouter.allowedMethods());

export default router;

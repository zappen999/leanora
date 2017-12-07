import { Middleware } from 'koa'

declare module 'koa-graphiql' {
  function Graphiql(settings: {}): Middleware

  export = Graphiql
}

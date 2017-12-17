# Leanora
> Boilerplate for rapid, LEAN development.

## Design philosophies
- API should not contain business logic (mutation/query resolvers)
- Object instantiation/creation should only be done in factories
  - Factories should be fed enough information to decide if the
    visitor should be able to create the object.
- Features should be isolated

## Todo
- Separate data loading from facade
- Dependency injection

## Generate migrations
We can use the migration tool that comes with typeorm. But we need to run it
inside the container. This can be done like this:

`npm run typeorm -- <typeorm args>`

Example:<br>
`npm run typeorm -- migrations:generate -n MembershipUpdate`

The migration file will be placed in `src/api`. Move it to the correct location
where the feature lives (`src/features/**/migrations/`).

## Run migrations
`npm run migrations:up`<br>
`npm run migrations:down` Reverts the last migration

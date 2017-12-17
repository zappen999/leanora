import { DocumentNode } from 'graphql'

export type ITypedef = (() => ITypedef[]) | string | DocumentNode

interface SchemaStitcherProps {
  // to be injected into Query type
  queryDefinition?: string
  // to be injected into Mutation type
  mutationDefinition?: string
  // types and dependecy types
  types: ITypedef
  // resolver map
  resolvers?: any // todo: import type IResolvers from graphql-tools
}

export class SchemaStitcher {
  public queryDefinition: string|undefined
  public mutationDefinition: string|undefined
  public types: ITypedef
  public resolvers: any // todo: import type IResolvers from graphql-tools

  constructor(props: SchemaStitcherProps) {
    this.queryDefinition = props.queryDefinition
    this.mutationDefinition = props.mutationDefinition
    this.types = props.types
    this.resolvers = props.resolvers
  }
}

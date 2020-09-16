import { GraphQLObjectType } from 'graphql';
import { GraphQLNonNull, GraphQLID } from 'graphql/type';
import { connectionArgs } from 'graphql-relay';
import { reviewConnectionType, ReviewResolver } from './review';
import { nodeInterface, NodeResolver } from './node';

export function buildQueryType(): GraphQLObjectType {
  const nodeResolver = new NodeResolver();
  const reviewResolver = new ReviewResolver();

  return new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      node: {
        type: nodeInterface,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve: (_, args: { id: string }) => nodeResolver.node(_, args),
      },
      reviews: {
        type: new GraphQLNonNull(reviewConnectionType),
        args: connectionArgs,
        resolve: (_, args) => reviewResolver.reviews(_, args),
      },
    }),
  });
}

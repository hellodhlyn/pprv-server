import { GraphQLObjectType } from 'graphql';
import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql/type';
import { connectionArgs } from 'graphql-relay';
import { getRepository } from 'typeorm';
import { memberType } from './member';
import { reviewConnectionType } from './review';
import { nodeInterface, NodeResolver } from './node';
import { Member } from '../models/member';
import { getReviewService } from '../services';

export function buildQueryType(): GraphQLObjectType {
  const nodeResolver = new NodeResolver();

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
        resolve: (_, args) => getReviewService().queryPublishedConnection(null, args),
      },
      member: {
        type: memberType,
        args: {
          username: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: (_, args: { username: string }) => getRepository(Member).findOne({ username: args.username }),
      },
    }),
  });
}

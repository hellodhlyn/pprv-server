import { GraphQLObjectType } from 'graphql';
import { GraphQLNonNull } from 'graphql/type';
import { connectionArgs, connectionFromArray } from 'graphql-relay';
import { reviewConnectionType } from './review';
import { nodeField } from './node';

export const queryType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    reviews: {
      type: new GraphQLNonNull(reviewConnectionType),
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray([], args),
    },
  }),
});

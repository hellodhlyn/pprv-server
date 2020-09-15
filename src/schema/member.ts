import { GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLNonNull, GraphQLEnumType } from 'graphql/type';
import { connectionArgs, connectionFromArray, globalIdField } from 'graphql-relay';
import { GraphQLDateTime } from 'graphql-iso-date';
import { reviewConnectionType } from './review';
import { nodeInterface } from './node';

export const memberTypeName = 'Member';

export const memberTypeEnumType = new GraphQLEnumType({
  name: 'MemberType',
  values: {
    ADMIN: { value: 'ADMIN' },
    USER: { value: 'USER' },
  },
});

export const memberType: GraphQLObjectType = new GraphQLObjectType({
  name: memberTypeName,
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(memberTypeName),
    username: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(memberTypeEnumType) },
    reviews: {
      type: new GraphQLNonNull(reviewConnectionType),
      args: connectionArgs,
      resolve: (member, args) => connectionFromArray([], args),
    },
    createdAt: { type: new GraphQLNonNull(GraphQLDateTime) },
  }),
});

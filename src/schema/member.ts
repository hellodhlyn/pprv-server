import { GraphQLObjectType } from 'graphql';
import {
  GraphQLNonNull, GraphQLEnumType, GraphQLString, GraphQLInt,
} from 'graphql/type';
import { connectionArgs, globalIdField } from 'graphql-relay';
import { GraphQLDateTime } from 'graphql-iso-date';
import { getRepository } from 'typeorm';
import { reviewConnectionType } from './review';
import { nodeInterface } from './node';
import { Review } from '../models/review';
import { getReviewService } from '../services';

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
    profileUrl: { type: GraphQLString },
    memberType: { type: new GraphQLNonNull(memberTypeEnumType) },
    reviews: {
      type: new GraphQLNonNull(reviewConnectionType),
      args: connectionArgs,
      resolve: (member, args) => getReviewService().queryPublishedConnection({ author: member }, args),
    },
    reviewsCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (member) => getRepository(Review).count({ author: member }),
    },
    createdAt: { type: new GraphQLNonNull(GraphQLDateTime) },
  }),
});

import { GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLNonNull, GraphQLEnumType, GraphQLInt } from 'graphql/type';
import { GraphQLDateTime } from 'graphql-iso-date';
import {
  Connection, ConnectionArguments, connectionDefinitions, globalIdField,
} from 'graphql-relay';
import { memberType } from './member';
import { nodeInterface } from './node';
import { Review } from '../models/review';
import ReviewService from '../services/review';

export const reviewTypeName = 'Review';

export const publishStateEnumType = new GraphQLEnumType({
  name: 'PublishState',
  values: {
    DRAFT: { value: 'DRAFT' },
    PUBLISHED: { value: 'PUBLISHED' },
    DELETED: { value: 'DELETED' },
  },
});

export const reviewType: GraphQLObjectType = new GraphQLObjectType({
  name: reviewTypeName,
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(reviewTypeName, (src: Review) => src.reviewId()),
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
    score: { type: new GraphQLNonNull(GraphQLInt) },
    thumbnailUrl: { type: GraphQLString },
    description: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: new GraphQLNonNull(memberType) },
    publishState: { type: new GraphQLNonNull(publishStateEnumType) },
    createdAt: { type: new GraphQLNonNull(GraphQLDateTime) },
    updatedAt: { type: new GraphQLNonNull(GraphQLDateTime) },
  }),
});

export const reviewConnectionType: GraphQLObjectType = connectionDefinitions({ nodeType: reviewType }).connectionType;

export class ReviewResolver {
  private reviewService: ReviewService;

  constructor() {
    this.reviewService = new ReviewService();
  }

  reviews(_: undefined, args: ConnectionArguments): Promise<Connection<Review>> {
    return this.reviewService.findAllPublishedConnection(args);
  }
}

import { GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLNonNull, GraphQLEnumType } from 'graphql/type';
import { connectionDefinitions, globalIdField } from 'graphql-relay';
import { GraphQLDateTime } from 'graphql-iso-date';
import { memberType } from './member';
import { nodeInterface } from './node';

export const reviewTypeName = 'Review';

export const publishStateEnumType = new GraphQLEnumType({
  name: 'PublishState',
  values: {
    DRAFT: { value: 'DRAFT' },
    PUBLISHED: { value: 'PUBLISHED' },
  },
});

export const reviewType: GraphQLObjectType = new GraphQLObjectType({
  name: reviewTypeName,
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(reviewTypeName),
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
    score: { type: new GraphQLNonNull(GraphQLString) },
    thumbnailUrl: { type: GraphQLString },
    description: { type: GraphQLString },
    author: { type: new GraphQLNonNull(memberType) },
    publishState: { type: new GraphQLNonNull(publishStateEnumType) },
    createdAt: { type: new GraphQLNonNull(GraphQLDateTime) },
    updatedAt: { type: new GraphQLNonNull(GraphQLDateTime) },
  }),
});

export const reviewConnectionType: GraphQLObjectType = connectionDefinitions({ nodeType: reviewType }).connectionType;

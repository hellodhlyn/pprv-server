import { fromGlobalId } from 'graphql-relay';
import { GraphQLInterfaceType, GraphQLID, GraphQLNonNull } from 'graphql/type';

import { memberType, memberTypeName } from './member';
import { reviewType, reviewTypeName } from './review';
import { Member } from '../models/member';
import { Review } from '../models/review';
import ReviewService from '../services/review';

export const nodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolveType(src: unknown) {
    if (src instanceof Member) return memberType;
    if (src instanceof Review) return reviewType;
    return null;
  },
});

export class NodeResolver {
  private reviewService: ReviewService;

  constructor() {
    this.reviewService = new ReviewService();
  }

  async node(_: undefined, args: { id: string }): Promise<unknown> {
    const { type, id } = fromGlobalId(args.id);
    switch (type) {
      case memberTypeName:
        return null;
      case reviewTypeName:
        return this.reviewService.findByReviewId(id);
      default:
        throw new Error('invalid node id');
    }
  }
}

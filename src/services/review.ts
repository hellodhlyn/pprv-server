import {
  FindConditions, getRepository, LessThan, MoreThan, Repository,
} from 'typeorm';
import {
  Connection, ConnectionArguments, cursorToOffset, offsetToCursor,
} from 'graphql-relay';
import { Member } from '../models/member';
import { PublishState, Review } from '../models/review';

export default class ReviewService {
  private memberRepo: Repository<Member>;

  private reviewRepo: Repository<Review>;

  constructor() {
    this.memberRepo = getRepository<Member>('Member');
    this.reviewRepo = getRepository<Review>('Review');
  }

  async findByReviewId(reviewId: string): Promise<Review> {
    const { username, authorReviewId } = Review.parseReviewId(reviewId);
    const author = await this.memberRepo.findOne({ username });
    if (!author) {
      return null;
    }
    return this.reviewRepo.findOne({ author, authorReviewId });
  }

  async findAllPublishedConnection(args: ConnectionArguments): Promise<Connection<Review>> {
    const where: FindConditions<Review> = { publishState: PublishState.PUBLISHED };
    if (args.after) {
      where.id = LessThan(cursorToOffset(args.after));
    } else if (args.before) {
      where.id = MoreThan(cursorToOffset(args.before));
    }

    const order: { id: 'ASC' | 'DESC' } = { id: (args.last ? 'ASC' : 'DESC') };
    const take = args.last || args.first || 20;
    const result = await this.reviewRepo.find({ where, order, take });
    result.sort((r) => r.id);

    return {
      edges: result.map((node) => ({ cursor: offsetToCursor(node.id), node })),
      pageInfo: result.length === 0 ? {
        startCursor: null,
        endCursor: null,
        hasNextPage: false,
        hasPreviousPage: false,
      } : {
        startCursor: offsetToCursor(result[0].id),
        endCursor: offsetToCursor(result[result.length - 1].id),
        hasPreviousPage: await this.reviewRepo.count({ id: MoreThan(result[0].id) }) > 0,
        hasNextPage: await this.reviewRepo.count({ id: LessThan(result[result.length - 1].id) }) > 0,
      },
    };
  }
}

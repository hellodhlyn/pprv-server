import ReviewService from './review';

const container: {
  reviewService: ReviewService,
} = {
  reviewService: null,
};

export function getReviewService(): ReviewService {
  if (!container.reviewService) {
    container.reviewService = new ReviewService();
  }
  return container.reviewService;
}

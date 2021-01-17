class Review < ApplicationRecord
  belongs_to :author, class_name: 'User'
  belongs_to :category, class_name: 'ReviewCategory'
  belongs_to :group, class_name: 'ReviewGroup'

  before_create :set_uuid
  before_create :set_author_review_id

  private

  def set_author_review_id
    self.author_review_id ||= ((author.reviews.last&.author_review_id || 0) + 1)
  end
end

require 'rails_helper'

RSpec.describe Review, type: :model do
  let(:category) { FactoryBot.create(:review_category) }
  let(:group) { FactoryBot.create(:review_group) }
  let(:author) { FactoryBot.create(:user) }

  context 'on create' do
    subject { Reviews::Post.create!(author: author, group: group, category: category) }

    it 'fill author_review_id' do
      expect(subject.uuid).not_to be_nil
      expect(subject.author_review_id).to be == 1
      expect(Reviews::Post.create!(author: author, group: group, category: category).author_review_id).to be == 2
    end
  end
end

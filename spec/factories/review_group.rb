FactoryBot.define do
  factory :review_group do
    title { Faker::Name.name }
    slug { Faker::Internet.slug }
    category { FactoryBot.create(:review_category) }
  end
end

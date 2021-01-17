FactoryBot.define do
  factory :review_category do
    title { Faker::Name.name }
    slug { Faker::Internet.slug }
  end
end

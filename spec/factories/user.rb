FactoryBot.define do
  factory :user do
    username { Faker::Internet.username }
    profile_url { Faker::Internet.url }
    description { Faker::Lorem.sentences(number: 2).join("\n") }
  end
end

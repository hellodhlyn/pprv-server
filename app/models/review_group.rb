class ReviewGroup < ApplicationRecord
  belongs_to :category, class_name: 'ReviewCategory'
end

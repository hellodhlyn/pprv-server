class CreateInitialModels < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :profile_url
      t.string :description, length: 200
      t.timestamps

      t.index [:username], unique: true
    end

    create_table :reviews do |t|
      t.string :type, null: false
      t.string :uuid, null: false
      t.bigint :author_id, null: false
      t.bigint :author_review_id, null: false
      t.bigint :category_id
      t.bigint :group_id
      t.string :title
      t.string :thumbnail_url
      t.json :content
      t.timestamps

      t.index [:type, :author_id, :author_review_id]
      t.index [:uuid], unique: true
    end

    create_table :review_categories do |t|
      t.string :title, null: false
      t.string :slug, null: false
      t.timestamps

      t.index [:title], unique: true
      t.index [:slug], unique: true
    end

    create_table :review_groups do |t|
      t.string :title, null: false
      t.string :slug, null: false
      t.bigint :category_id, null: false
      t.timestamps

      t.index [:title], unique: true
      t.index [:slug], unique: true
      t.index [:category_id]
    end
  end
end

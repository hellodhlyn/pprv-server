# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_01_17_044246) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "review_categories", force: :cascade do |t|
    t.string "title", null: false
    t.string "slug", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["slug"], name: "index_review_categories_on_slug", unique: true
    t.index ["title"], name: "index_review_categories_on_title", unique: true
  end

  create_table "review_groups", force: :cascade do |t|
    t.string "title", null: false
    t.string "slug", null: false
    t.bigint "category_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["category_id"], name: "index_review_groups_on_category_id"
    t.index ["slug"], name: "index_review_groups_on_slug", unique: true
    t.index ["title"], name: "index_review_groups_on_title", unique: true
  end

  create_table "reviews", force: :cascade do |t|
    t.string "type", null: false
    t.string "uuid", null: false
    t.bigint "author_id", null: false
    t.bigint "author_review_id", null: false
    t.bigint "category_id"
    t.bigint "group_id"
    t.string "title"
    t.string "thumbnail_url"
    t.json "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["type", "author_id", "author_review_id"], name: "index_reviews_on_type_and_author_id_and_author_review_id"
    t.index ["uuid"], name: "index_reviews_on_uuid", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "profile_url"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end

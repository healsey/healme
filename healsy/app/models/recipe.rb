class Recipe < ApplicationRecord
    has_many :recipe_users, dependent: :destroy 
    has_many :users, through: :recipe_users
    serialize :metadata, JSON
end

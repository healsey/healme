class User < ApplicationRecord
    has_secure_password
    
    has_many :user_recipes
    has_many :recipes, through: :user_recipes
    has_many :user_allergies
    has_many :allergies, through: :user_allergies
end

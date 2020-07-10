class User < ApplicationRecord
    has_secure_password
    
    has_many :recipe_users
    has_many :recipes, through: :recipe_users
    has_many :user_allergies
    has_many :allergies, through: :user_allergies
end

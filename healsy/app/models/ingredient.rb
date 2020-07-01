class Ingredient < ApplicationRecord
    has_many :health_condition_ingredients
    has_many :health_condition_ingredients, through:  :ingredients
end

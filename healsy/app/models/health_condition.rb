class HealthCondition < ApplicationRecord
    has_many :health_condition_ingredients
    has_many :ingredients, through:  :health_condition_ingredients
end

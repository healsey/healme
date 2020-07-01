class HealthConditionIngredient < ApplicationRecord
    belongs_to :health_condition
    belongs_to :ingredient 
end

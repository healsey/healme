class HealthConditionsController < ApplicationController

    def index 
        conditions = HealthCondition.all
        render json: conditions
    end 
end

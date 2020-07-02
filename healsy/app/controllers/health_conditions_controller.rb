class HealthConditionsController < ApplicationController

    def index 
        # conditions = HealthCondition.all
        # render json: conditions

        url = "https://api.edamam.com/search?q=''&app_id=63149c77&app_key=a850c45e6565a7cd23cf7065a04a774c&health=sugar-conscious"
        data = RestClient.get(url)

        # #url = 'https://api.nal.usda.gov/fdc/v1/foods/list?api_key=Dnp8tZTZkqEP5ZfoYlDFPa0CUZ3MRhF7PstcjpWu'
        # url = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=pizza"
        # data = RestClient.get(url)
        render json: data
    end 
end

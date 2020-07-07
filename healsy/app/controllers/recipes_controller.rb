class RecipesController < ApplicationController
     def index 
        # conditions = HealthCondition.all
        # render json: conditions

       url = "https://api.edamam.com/search?q=&app_id=63149c77&app_key=a850c45e6565a7cd23cf7065a04a774c&mealType=dinner&excluded=veal"
       data = RestClient.get(url)

        # RestClient.get(url, {params:{health: ["fish-free", "egg-free"]}}) {|response, request, result| byebug }
        #RestClient::Request.execute(method: :get, url: url, payload: {'health'=> ["fish-free", "egg-free"]}){|response, request, result| byebug}
        #data = RestClient::Request.execute(:method => :get, :url => url, :payload => {'health' => ['egg-free', 'fish-free']}){|response, request, result| byebug}
        render json: data
    end 


    def filtered_recipes 
        url = "https://api.edamam.com/search?q=&app_id=63149c77&app_key=a850c45e6565a7cd23cf7065a04a774c&#{params[:filtered_recipes]}"
        data = RestClient.get(url)
 
         # RestClient.get(url, {params:{health: ["fish-free", "egg-free"]}}) {|response, request, result| byebug }
         #RestClient::Request.execute(method: :get, url: url, payload: {'health'=> ["fish-free", "egg-free"]}){|response, request, result| byebug}
         #data = RestClient::Request.execute(:method => :get, :url => url, :payload => {'health' => ['egg-free', 'fish-free']}){|response, request, result| byebug}
         render json: data
    end

end

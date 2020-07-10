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
        # byebug
        if (params[:search_term] == 'null') 
            url = "https://api.edamam.com/search?q=&app_id=63149c77&app_key=a850c45e6565a7cd23cf7065a04a774c&#{params[:filtered_recipes]}"
            data = RestClient.get(url)
             render json: data
        elsif (params[:filtered_recipes] == 'null')
            url = "https://api.edamam.com/search?q=#{params[:search_term]}&app_id=63149c77&app_key=a850c45e6565a7cd23cf7065a04a774c"
            data = RestClient.get(url)
            render json: data
        else 
            url = "https://api.edamam.com/search?q=#{params[:search_term]}&app_id=63149c77&app_key=a850c45e6565a7cd23cf7065a04a774c&#{params[:filtered_recipes]}"
            data = RestClient.get(url)
            render json: data
        end 
        # render json: data
         # RestClient.get(url, {params:{health: ["fish-free", "egg-free"]}}) {|response, request, result| byebug }
         #RestClient::Request.execute(method: :get, url: url, payload: {'health'=> ["fish-free", "egg-free"]}){|response, request, result| byebug}
         #data = RestClient::Request.execute(:method => :get, :url => url, :payload => {'health' => ['egg-free', 'fish-free']}){|response, request, result| byebug}
        
    end

    def create
        user = User.find(params["user_id"])
        metadata = params["metadata"]
        uri = params["uri"]
        # byebug
        recipe = Recipe.create(metadata: metadata, uri: uri)
        RecipeUser.create(user_id: user.id, recipe_id: recipe.id)

        render json: recipe
    end

    def saved_recipes
        user = User.find(params["user_id"])
        recipes = user.recipes
        
        render json: recipes
    end


    def destroy  
        uri = params["uri"]
        user = User.find(params["user_id"])
        recipe = Recipe.find_by(uri: uri)
        recipe.destroy

        render json: {message: "Successfully deleted!"}
    end 

end

Rails.application.routes.draw do
  
  post "/users/login" => 'users#login'
  post "/recipes/saved_recipes" => 'recipes#saved_recipes'
  get "/recipes/:filtered_recipes" => 'recipes#filtered_recipes'
  delete "/recipes" => 'recipes#destroy'

  resources :user_allergies
  resources :allergies
  resources :recipe_users
  resources :users
  resources :recipes
  resources :health_conditions


  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

Rails.application.routes.draw do
  
  resources :user_allergies
  resources :allergies
  resources :recipe_users
  resources :users
  resources :recipes
  resources :health_conditions

  post "/users/login" => 'users#login'
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

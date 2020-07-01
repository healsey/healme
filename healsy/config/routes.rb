Rails.application.routes.draw do
  resources :health_condition_ingredients
  resources :health_conditions
  resources :ingredients
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

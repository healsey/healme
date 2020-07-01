# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ingredients = ["banana", "apple", "walnuts", "salmon"]
healthConditions = ["hypertension", "diabetes", "alzheimers", "high cholesterol"]
images = ["https://i.dlpng.com/static/png/6556841_preview.png", "https://mgsfl.com/wp-content/uploads/2017/05/Foods-that-Lowers-Blood-Pressure.jpg", "https://i0.wp.com/human-memory.net/wp-content/uploads/2020/03/image.png?fit=1024%2C844&ssl=1"]

ingredients.each do |ingredient|
    Ingredient.create(name: ingredient)
end

healthConditions.each do |condition|
    HealthCondition.create(name: condition, image_url: images.sample)
end

HealthConditionIngredient.create(health_condition_id: 1, ingredient_id: 1 )
HealthConditionIngredient.create(health_condition_id: 1, ingredient_id: 2 )
HealthConditionIngredient.create(health_condition_id: 2, ingredient_id: 1 )
HealthConditionIngredient.create(health_condition_id: 3, ingredient_id: 1 )

HealthConditionIngredient.create(health_condition_id: 4, ingredient_id: 1 )
HealthConditionIngredient.create(health_condition_id: 4, ingredient_id: 3 )
HealthConditionIngredient.create(health_condition_id: 3, ingredient_id: 4 )
HealthConditionIngredient.create(health_condition_id: 2, ingredient_id: 4 )


puts "Seeded!!!"
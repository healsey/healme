# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

allergies = ["egg-free", "dairy-free", "fish-free", "gluten-free", "peanut-free", "shellfish-free", "soy-free", "legume-free", "sesame-free", "tree-nut-free", "wheat-free"]

# healthConditions = ["hypertension", "diabetes", "alzheimers", "high cholesterol"]

# images = ["https://i.dlpng.com/static/png/6556841_preview.png", "https://mgsfl.com/wp-content/uploads/2017/05/Foods-that-Lowers-Blood-Pressure.jpg", "https://i0.wp.com/human-memory.net/wp-content/uploads/2020/03/image.png?fit=1024%2C844&ssl=1"]

allergies.each do |ingredient|
    Allergy.create(name: ingredient)
end

# healthConditions.each do |condition|
#     HealthCondition.create(name: condition, image_url: images.sample)
# end

senada = User.create(name: "Senadadad", email: "Senada@gmail.com", password: "1234")
bashir = User.create(name: "Beshrr", email: "Bashir@gmail.com", password: "1234")

UserAllergy.create(user_id: senada.id, allergy_id: Allergy.first.id)
UserAllergy.create(user_id: senada.id, allergy_id: Allergy.last.id)
UserAllergy.create(user_id: bashir.id, allergy_id: Allergy.second.id)
UserAllergy.create(user_id: bashir.id, allergy_id: Allergy.last.id)

puts "Seeded!!!"
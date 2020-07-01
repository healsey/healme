class CreateHealthConditionIngredients < ActiveRecord::Migration[6.0]
  def change
    create_table :health_condition_ingredients do |t|
      t.integer :health_condition_id
      t.integer :ingredient_id

      t.timestamps
    end
  end
end

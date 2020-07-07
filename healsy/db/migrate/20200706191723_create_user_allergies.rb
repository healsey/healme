class CreateUserAllergies < ActiveRecord::Migration[6.0]
  def change
    create_table :user_allergies do |t|
      t.integer :user_id
      t.integer :allergy_id

      t.timestamps
    end
  end
end

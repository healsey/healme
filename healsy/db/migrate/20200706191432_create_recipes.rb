class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.string :metadata
      t.string :uri

      t.timestamps
    end
  end
end

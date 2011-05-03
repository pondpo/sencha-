class CreateCards < ActiveRecord::Migration
  def self.up
    create_table :cards do |t|
      t.string :numbers
      t.string :results
      t.boolean :is_winner
      t.references :user
      t.integer :max_connect      

      t.timestamps
    end
  end

  def self.down
    drop_table :cards
  end
end

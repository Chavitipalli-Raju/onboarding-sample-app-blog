class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title, :null => false
      t.string :description, :null => false
      t.integer :userid, :null => false
      t.timestamps
    end
  end
end

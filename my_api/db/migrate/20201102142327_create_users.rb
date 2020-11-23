class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, :null => false, :unique => true
      t.string :password_digest, :null => false
      t.string :fullname, :null => false, :unique => true
      t.integer :isadmin, :default => 0
      t.timestamps
    end
  end
end

class AddAttributesToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :name,         :string,  :null => false, :default => ""
    add_column :users, :nickname,     :string,  :null => false, :default => ""
    add_column :users, :mobile,       :string,  :null => false, :default => ""
    add_column :users, :work,         :text,    :null => false, :default => ""
    add_column :users, :referrer_id,  :integer
    add_column :users, :join,         :boolean, :null => false, :default => false
    add_column :users, :register,     :boolean, :null => false, :default => false
  end

  def self.down
    remove_column :users, :name
    remove_column :users, :nickname
    remove_column :users, :mobile
    remove_column :users, :work
    remove_column :users, :referrer_id
    remove_column :users, :join
    remove_column :users, :register
  end
end

class Post < ActiveRecord::Base
    attr_accessible :title, :description, :userid
    validates :title, presence: true, length: { minimum: 4, maximum: 255 }
    validates :description, presence: true
end

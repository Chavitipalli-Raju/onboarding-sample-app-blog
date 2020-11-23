class User < ActiveRecord::Base
    has_secure_password
    attr_accessible :username, :fullname, :isadmin, :password_field, :password
    before_save { self.username = username.downcase }
    validates :username, presence: true, length:{minimum: 5, maximum: 15}
    validates :password, presence: true, length: { minimum: 6 }
    validates_format_of :username, :with => /^[a-zA-Z0-9_]*$/
end

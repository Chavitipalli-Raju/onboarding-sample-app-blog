class AuthenticateUser
    prepend SimpleCommand

    def initialize(username, password)
        @username = username
        @password_digest = password
    end

    def call
        JsonWebToken.encode(user_id: user.id) if user
    end

    private

    attr_accessor :username, :password_digest

    def user
        user = User.find_by_username(@username)
        return user if user && user.authenticate(@password_digest)
        errors.add :user_authentication, 'invalid credentials'
        nil
    end
end
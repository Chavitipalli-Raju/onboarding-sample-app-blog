class AuthenticationController < ApplicationController
    skip_before_filter :authenticate_request

    def authenticate
        command = AuthenticateUser.call(params[:username], params[:password])

        if command.success?
            user = User.find_by_username(params[:username])
            render json: { auth_token: command.result, user: user }, status: :ok
        else
            render json: { error: command.errors }, status: :unauthorized
        end
    end
end
class UsersController < ApplicationController
  skip_before_filter :authenticate_request, only: [:create]

  def create
    user = User.new(user_params)
    if user.valid?
      begin
        User.create(user_params)
        render json: {message: "Created"}, status: :created
      rescue ActiveRecord::RecordNotUnique
        render json: {message: "Username already exist"}, status: 432
      rescue Exception => e
        render json: {message: "Failed to create User", errormesaage: e.message}, status: :unprocessable_entity
      end
    else
      if user.errors.messages[:username]
        render json: {message: user.errors.messages}, status: 433
      else
        if user.errors.messages[:password]
          render json: {message: user.errors.messages}, status: 434
        else
          render json: {message: user.errors.messages}, status: :unprocessable_entity
        end
      end
    end
  end

  def index
    users = User.all
    render json: users, status: :ok
  end

  def show
    begin
      user = User.find(params[:id])
      render json: user, status: :ok
    rescue Exception => e
      render json: {message:"POST NOT FOUND",  error_message: e.message}, status: :not_found
    end
  end

  def me
    render json: @current_user, status: :ok
  end
  private
  def user_params
    params[:user]
  end
end

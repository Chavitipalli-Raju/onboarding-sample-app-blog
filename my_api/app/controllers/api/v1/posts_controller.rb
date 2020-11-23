module Api
    module V1
        class PostsController < ApplicationController
            def index
                posts = Post.order('updatedOn DESC')
                render json:posts, status: :ok
            end

            def show
                begin
                    post = Post.find(params[:id])
                    render json: post, status: :ok
                rescue Exception => e
                    render json: {message:"POST NOT FOUND",  error_message: e.message}, status: :not_found
                end
            end

            def create
                begin
                    post_params = {
                        title:params.fetch("title"),
                        description: params.fetch("description"),
                        userid: @current_user[:userid]
                    }
                    post = Post.new(post_params)
                    if post.save
                        render json: Post.find(post["postid"]), status: :created
                    else
                        render json: {message: "Failed to save post"}, status: :unprocessable_entity
                    end
                rescue Exception => e
                    render json: {data: params["post"], message: e.message}, status: :bad_request
                end
            end

            def destroy
                begin
                    post = Post.find(params[:id])
                    if @current_user[:isadmin] === 1 or post[:userid] === @current_user[:userid]
                        post.destroy
                        render json: {message: "Post deleted"}, status: :ok
                    else
                        render json: {message: "Failed to delete post"}, status: :unauthorized
                    end
                rescue Exception => e
                    render json: {message:"Post not found",  error_message: e.message}, status: :not_found
                end
            end

            def update
                begin
                    post = Post.find(params[:id])

                    if @current_user[:isadmin] === 1 or post[:userid] === @current_user[:userid]
                        if post.update_attributes(params.fetch("post"))
                            render json: Post.find(post["postid"]), status: :ok
                        else
                            render json: {message: "Failed to update post"}, status: :unprocessable_entity
                        end
                    else
                        render json: {message: "Failed to update post"}, status: :unauthorized
                    end
                rescue Exception => e
                    render json: {data: params["post"], message: e.message}, status: :bad_request
                end
            end

            def myposts
                posts = current_user[:isadmin]==1 ? Post.all : Post.all(:conditions => "userid = #{current_user[:userid]}")
                render json: posts, status: :ok
            end
        end
    end
end


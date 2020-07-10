class UsersController < ApplicationController
    #skip_before_action :authenticate_request 

    def create
        email = params["email"]
        name = params["name"]
        password = params["password"]
        if User.find_by(email: email)
            render json: { message: "User already exists"}
        else
            user = User.create(name: name, email: email, password: password)
            command = AuthenticateUser.call(email, password)

            render json: {auth_token: command.result, user: user}
        end
    end


    # def login
    #     email = params["user"]["email"]
    #     user = User.find_by(email: email)
    #     if user 
    #         render json: user 
    #     else 
    #         render json: {message: "User does not exist!"}
    #     end 
    # end 

    def login
        command = AuthenticateUser.call(params["email"], params["password"])
        if command.success?
            current_user = User.find_by(email: params[:email])
            render json: { auth_token: command.result , user: current_user}
        else
            render json: { error: command.errors }, status: :unauthorized
        end
    end 



    def authenticate_request
        @current_user = AuthorizeApiRequest.call(request.headers).result
        render json: { error: 'Not Authorized' }, status: 401 unless @current_user
    end


end

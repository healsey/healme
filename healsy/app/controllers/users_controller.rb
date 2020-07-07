class UsersController < ApplicationController

    def create
        email = params["user"]["email"]
        name = params["user"]["name"]
        if User.find_by(email: email)
            render json: { message: "User already exists"}
        else
            user = User.create(name: name, email: email)

            render json: user
        end
    end
end

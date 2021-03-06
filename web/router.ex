defmodule RestaurantImportInfo.Router do
  use RestaurantImportInfo.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
  end

  scope "/", RestaurantImportInfo do
    pipe_through :browser # Use the default browser stack

    get "/", AuthenticationController, :index
    get "/dashboard", DashboardController, :index
    get "/confirm/:account_id/:confirm_code", AuthenticationController, :confirm_account
  end

  # Other scopes may use custom stacks.
  scope "/api", RestaurantImportInfo.Api do
    pipe_through :api
    
    scope "/upload" do
        post "/uploadfile", UploadController, :upload_file
    end
    
    scope "/authen" do
        post "/signup", AuthenticationController, :sign_up
        post "/login", AuthenticationController, :log_in
    end
    
    scope "/dashboard" do
        get "getallrestaurant", DashboardController, :get_all_restaurant
        post "createrestaurant", DashboardController, :create_restaurant
    end
  end
end

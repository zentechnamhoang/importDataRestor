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
  end

  scope "/", RestaurantImportInfo do
    pipe_through :browser # Use the default browser stack

    get "/", AuthenticationController, :index
    get "/dashboard", DashboardController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", RestaurantImportInfo do
  #   pipe_through :api
  # end
end

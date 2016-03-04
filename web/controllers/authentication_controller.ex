defmodule RestaurantImportInfo.AuthenticationController do
  use RestaurantImportInfo.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
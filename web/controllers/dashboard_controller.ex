defmodule RestaurantImportInfo.DashboardController do
  use RestaurantImportInfo.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
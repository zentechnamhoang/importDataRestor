defmodule RestaurantImportInfo.Api.UploadController do
  use RestaurantImportInfo.Web, :controller
  
  def upload_file(conn, params) do
    IO.inspect params
    RestaurantImportInfo.Avatar.store({params["image"], %{id: 123}})
    json conn, %{result: true, mes: "ok"}
  end
end
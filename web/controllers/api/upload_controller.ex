defmodule RestaurantImportInfo.Api.UploadController do
  use RestaurantImportInfo.Web, :controller
  
  def upload_file(conn, params) do
    account_id = 123
    res = RestaurantImportInfo.Avatar.store({params["image"], %{id: account_id}})
    IO.inspect res
    is_upload_file_success conn, res, account_id
  end
  
  defp is_upload_file_success(conn, {:ok, res}, account_id) do
    host = RestaurantImportInfo.Utils.extract_domain_name(conn) <> "/images/avatars/#{account_id}/"
    image = host <> res
    json conn, %{result: true, mes: "ok", data: image}
  end
  
  defp is_upload_file_success(conn, {:error, res}, account_id) do
    json conn, %{result: false, mes: Atom.to_string(res), data: nil}
  end
end
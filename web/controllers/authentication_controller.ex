alias RestaurantImportInfo.BackendWrapper

defmodule RestaurantImportInfo.AuthenticationController do
  use RestaurantImportInfo.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
  
  def confirm_account(conn, %{"account_id" => account_id, "confirm_code" => confirm_code}) do
    confirm_code_response = BackendWrapper.confirm_account(:default_wrapper, confirm_code, account_id)
    IO.inspect confirm_code_response
    is_confirm_code_success conn, confirm_code_response
  end
  
  defp is_confirm_code_success(conn, {:ok, res}) do
    redirect conn, to: "/#/ConfirmSuccess"
  end
  
  defp is_confirm_code_success(conn, {:error, res}) do
    redirect conn, to: "/#/ConfirmUnSuccess"
  end
end
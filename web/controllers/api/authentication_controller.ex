alias RestaurantImportInfo.BackendWrapper

defmodule RestaurantImportInfo.Api.AuthenticationController do
	use RestaurantImportInfo.Web, :controller
    
    def sign_up(conn, %{"email" => email, "phone_number" => phone_number, "password" => password, "first_name" => first_name, "last_name" => last_name, "address" => address}) do
        sign_up_response = BackendWrapper.sign_up(:default_wrapper, email, phone_number, password, first_name, last_name, address)
        IO.inspect sign_up_response
        is_sign_up_success conn, sign_up_response
    end
    
    defp is_sign_up_success(conn, {:ok, res}) do
        json conn, %{result: res.success, mes: res.raw["status"]}
    end
    
    defp is_sign_up_success(conn, {:error, res}) do
        case res.code do
            400 -> reason = res.raw["message"] <> ", " <> res.raw["data"]["email"]["unique"]
        end
        json conn, %{result: res.success, mes: res.raw["status"], reason: reason}
    end
    
    def log_in(conn, %{"username" => username, "password" => password}) do
        log_in_response = BackendWrapper.log_in(:default_wrapper, username, password)
        IO.inspect log_in_response
        is_log_in_success conn, log_in_response
    end
    
    defp is_log_in_success(conn, {:ok, res}) do
        conn = put_session conn, :auth_token, res.raw["auth_token"]
        conn = put_session conn, :account_id, res.raw["data"]["account_id"]
        IO.inspect conn
        IO.inspect get_session(conn, :auth_token)
        IO.inspect get_session(conn, :account_id)
        json conn, %{result: res.success, mes: res.raw["status"]}
    end
    
    defp is_log_in_success(conn, {:error, res}) do
        case res.code do
            401 -> reason = res.raw["message"] <> ", " <> res.raw["data"]
            _ -> reason = ""
        end
        json conn, %{result: res.success, mes: res.raw["status"], reason: reason}
    end
end
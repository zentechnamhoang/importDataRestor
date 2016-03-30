alias RestaurantImportInfo.BackendWrapper

defmodule RestaurantImportInfo.Api.DashboardController do
	use RestaurantImportInfo.Web, :controller
    
    def get_all_restaurant(conn, _params) do
        auth_token = get_session conn, :auth_token
        account_id = get_session conn, :account_id
        get_all_restaurant_response = BackendWrapper.get_all_restaurant(:default_wrapper, account_id, auth_token)
        
        IO.inspect get_all_restaurant_response
        is_get_all_restaurant conn, get_all_restaurant_response
    end
    
    defp is_get_all_restaurant(conn, {:ok, res}) do
        group_by_city = Enum.group_by(res.raw["data"], fn(x) -> x["city"] end)
        IO.inspect group_by_city
        json conn, %{result: true, mes: "success", data: group_by_city}
    end
    
    defp is_get_all_restaurant(conn, {:error, res}) do
        case res.code do
            401 -> reason = res.raw["message"] <> ", " <> res.raw["data"]
            _ -> reason = ""
        end
        json conn, %{result: false, mes: reason, data: []}
    end
    
    def create_restaurant(conn, params) do
        auth_token = get_session conn, :auth_token
        account_id = get_session conn, :account_id
        create_restaurant_response = BackendWrapper.create_restaurant(:default_wrapper, account_id, auth_token, params["name"], params["types"], params["address"], params["phone_numbers"], params["status"], params["open_time"], params["close_time"], params["country"], params["state"], params["city"], params["long_position"], params["lat_position"], params["zip_code"], params["district"], params["ward"], params["supports"], params["pos_type"], params["time_zone"], params["tax"], params["tips"], params["fees"], params["franchise_id"], params["payment_methods"], params["images"])
        IO.inspect create_restaurant_response
        is_create_restaurant conn, create_restaurant_response
    end
    
    defp is_create_restaurant(conn, {:ok, res}) do
        json conn, %{result: true, mes: "success", data: []}
    end
    
    defp is_create_restaurant(conn, {:error, res}) do
        case res.code do
            401 -> reason = res.raw["message"] <> ", " <> res.raw["data"]
            _ -> reason = ""
        end
        json conn, %{result: false, mes: reason, data: []}
    end
end
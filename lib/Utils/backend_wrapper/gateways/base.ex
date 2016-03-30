defmodule RestaurantImportInfo.BackendWrapper.Gateways.Base do
    alias RestaurantImportInfo.BackendWrapper.Response
    @doc false
    defmacro __using__(_) do
        quote location: :keep do
        # Dashboard
        def create_menu(_account_id, _access_token, _version, _name, _status, _start_time, _end_time, _restaurant_id, _opts) do
            not_implemented
        end
        
        def get_all_restaurant(_account_id, _access_token, _opts) do
            not_implemented
        end
        
        def create_restaurant(_account_id, _access_token, _name, _types, _address, _phone_numbers, _status, _open_time, _close_time, _country, _state, _city, _long_position, _lat_position, _zip_code, _district, _ward, _supports, _pos_type, _time_zone, _tax, _tips, _fees, _franchise_id, _payment_methods, _images, _opts) do
            not_implemented
        end
        
        # Authentication
        def confirm_account(_confirm_code, _account_id, _opts) do
            not_implemented
        end
        
        def log_in(_username, _password, _opts) do
            not_implemented
        end
        
        def sign_up(_email, _phone_number, _password, _first_name, _last_name, _address, _opts) do
            not_implemented
        end 
        
        defp http(method, path, params \\ nil, opts \\[]) do
			headers = [{"Content-Type", "application/json"}]
			send_request(method, path, headers, params, opts)
		end
		
		defp authen_http(method, path, access_token, params \\ nil, opts \\[]) do
			headers = [{"Content-Type", "application/json"}, {"Authorization", "Bearer #{access_token}"}]
			send_request(method, path, headers, params, opts)
		end
        
        defp send_request(method, path, headers, params \\ nil, opts \\ []) do
			data = ""
			if (params != nil), do: data = params_to_json_string(params)
			HTTPoison.request(method, path, data, headers)		
		end
		
		defp params_to_string(params) do
			params |> Enum.filter(fn {_k, v} -> v != nil end)
			|> URI.encode_query
		end
		
		defp params_to_json_string(params) do			
			Jazz.encode! params
		end
		
		@doc false
		defp not_implemented do
			{:error, Response.error(code: :not_implemented)}
		end
        
        defoverridable [sign_up: 7, log_in: 3, confirm_account: 3, create_restaurant: 27, get_all_restaurant: 3, create_menu: 9]
		end
    end
end
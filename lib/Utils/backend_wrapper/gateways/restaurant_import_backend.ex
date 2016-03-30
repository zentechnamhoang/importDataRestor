defmodule RestaurantImportInfo.BackendWrapper.Gateways.RestaurantImportInfoBackend do
   use RestaurantImportInfo.BackendWrapper.Gateways.Base
   
   alias RestaurantImportInfo.BackendWrapper.Response
   
   # Dashboard
    def create_menu(account_id, access_token, version, name, status, start_time, end_time, restaurant_id, opts) do
        params = %{version: version, name: name, status: status, start_time: start_time, end_time: end_time, restaurant_id: restaurant_id}
        authen_commit(:put, "menus", access_token, params, opts)
    end
   
    def get_all_restaurant(account_id, access_token, opts) do
        authen_commit(:get, "restaurants", access_token, [], opts)
    end
   
    def create_restaurant(account_id, access_token, name, types, address, phone_numbers, status, open_time, close_time, country, state, city, long_position, lat_position, zip_code, district, ward, supports, pos_type, time_zone, tax, tips, fees, franchise_id, payment_methods, images, opts) do
        params = %{name: name, types: types, address: address, phone_numbers: phone_numbers, status: status, open_time: open_time, close_time: close_time, country: country, state: state, city: city, long_position: long_position, lat_position: lat_position, zip_code: zip_code, district: district, ward: ward, supports: supports, pos_type: pos_type, time_zone: time_zone, tax: tax, tips: tips, fees: fees, franchise_id: franchise_id, payment_methods: payment_methods, images: images}
        authen_commit(:put, "restaurants", access_token, params, opts)
    end
   
   # Authentication
    def confirm_account(confirm_code, account_id, opts) do
        params = %{confirm_code: confirm_code}
        commit(:post, "accounts/#{account_id}/confirm/", params, opts)
    end
   
    def sign_up(email, phone_number, password, first_name, last_name, address, opts) do
        params = %{email: email, phone_number: phone_number, password: password, first_name: first_name, last_name: last_name, address: address}
        commit(:put, "accounts", params, opts)
    end
    
    def log_in(username, password, opts) do
        params = %{username: username, password: password, scope: "USER", grant_type: "password"}
        commit(:post, "auth", params, opts)
    end
   
    defp commit(method, path, params, opts) do
        config = Keyword.fetch!(opts, :config)
        http(method, "#{config.base_url}/#{path}", params)
        |> respond
    end
  
    defp authen_commit(method, path, access_token, params, opts) do
        config = Keyword.fetch!(opts, :config)
        authen_http(method, "#{config.base_url}/#{path}", access_token, params)
        |> respond
    end
  
    defp respond({:ok, %{status_code: status, body: body}} = params) when status < 300 and status >= 200 do
        data = Jazz.decode!(body)
        
        {:ok, Response.success(raw: data, code: status)}
    end 
  
    defp respond({:ok, %{body: body, status_code: status_code}} = params) do
    
        if (String.length(to_string(body)) == 0), do: body = "{}"
        data = Jazz.decode!(body)    
        
        {:error, Response.error(code: status_code, reason: data["message"], raw: data)}
    end
end
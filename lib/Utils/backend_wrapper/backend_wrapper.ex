defmodule RestaurantImportInfo.BackendWrapper do
    use Application
    # Dashboard
    def create_menu(worker, account_id, access_token, version, name, status, start_time, end_time, restaurant_id, opts \\ []) do
        GenServer.call(worker, {:create_menu, account_id, access_token, version, name, status, start_time, end_time, restaurant_id, opts})
    end
    
    def get_all_restaurant(worker, account_id, access_token, opts \\ []) do
        GenServer.call(worker, {:get_all_restaurant, account_id, access_token, opts})
    end
    
    def create_restaurant(worker, account_id, access_token, name, types, address, phone_numbers, status, open_time, close_time, country, state, city, long_position, lat_position, zip_code, district, ward, supports, pos_type, time_zone, tax, tips, fees, franchise_id, payment_methods, images, opts \\ []) do
        GenServer.call(worker, {:create_restaurant, account_id, access_token, name, types, address, phone_numbers, status, open_time, close_time, country, state, city, long_position, lat_position, zip_code, district, ward, supports, pos_type, time_zone, tax, tips, fees, franchise_id, payment_methods, images, opts})
    end
    
    # Authentication
    def confirm_account(worker, confirm_code, account_id, opts \\ []) do
        GenServer.call(worker, {:confirm_account, confirm_code, account_id, opts})
    end
    
    def log_in(worker, username, password, opts \\ []) do
        GenServer.call(worker, {:log_in, username, password, opts})
    end
    
    def sign_up(worker, email, phone_number, password, first_name, last_name, address, opts \\ []) do
        GenServer.call(worker, {:sign_up, email, phone_number, password, first_name, last_name, address, opts})
    end
end
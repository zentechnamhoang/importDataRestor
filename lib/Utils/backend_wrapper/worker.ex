defmodule RestaurantImportInfo.BackendWrapper.Worker do
    use GenServer
	
	def start_link(gateway, config, opts \\ []) do
		GenServer.start_link(__MODULE__, [gateway, config], opts)
	end
	
	def init([gateway, config]) do
		{:ok, %{config: config, gateway: gateway}}
	end
    
    # Dashboard
    def handle_call({:get_all_restaurant, account_id, access_token, opts}, _from, state) do
		response = state.gateway.get_all_restaurant(account_id, access_token, [{:config, state.config} | opts])
		{:reply, response, state}
  	end
    
    def handle_call({:create_restaurant, account_id, access_token, name, types, address, phone_numbers, status, open_time, close_time, country, state, city, long_position, lat_position, zip_code, district, ward, supports, pos_type, time_zone, tax, tips, fees, franchise_id, payment_methods, images, opts}, _from, state_call) do
    IO.puts "123"
		response = state_call.gateway.create_restaurant(account_id, access_token, name, types, address, phone_numbers, status, open_time, close_time, country, state, city, long_position, lat_position, zip_code, district, ward, supports, pos_type, time_zone, tax, tips, fees, franchise_id, payment_methods, images, [{:config, state_call.config} | opts])
		{:reply, response, state_call}
  	end
    
    # Authentication
    def handle_call({:confirm_account, confirm_code, account_id, opts}, _from, state) do
		response = state.gateway.confirm_account(confirm_code, account_id, [{:config, state.config} | opts])
		{:reply, response, state}
  	end
    
    def handle_call({:log_in, username, password, opts}, _from, state) do
		response = state.gateway.log_in(username, password, [{:config, state.config} | opts])
		{:reply, response, state}
  	end
    
    def handle_call({:sign_up, email, phone_number, password, first_name, last_name, address, opts}, _from, state) do
		response = state.gateway.sign_up(email, phone_number, password, first_name, last_name, address, [{:config, state.config} | opts])
		{:reply, response, state}
  	end
end
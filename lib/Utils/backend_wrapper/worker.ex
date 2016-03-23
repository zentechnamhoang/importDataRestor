defmodule RestaurantImportInfo.BackendWrapper.Worker do
    use GenServer
	
	def start_link(gateway, config, opts \\ []) do
		GenServer.start_link(__MODULE__, [gateway, config], opts)
	end
	
	def init([gateway, config]) do
		{:ok, %{config: config, gateway: gateway}}
	end
    
    def handle_call({:login, username, password, opts}, _from, state) do
		response = state.gateway.login(username, password, [{:config, state.config} | opts])
		{:reply, response, state}
  	end
end
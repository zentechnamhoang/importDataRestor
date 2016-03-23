defmodule RestaurantImportInfo.BackendWrapper.Gateways.Base do
    alias RestaurantImportInfo.BackendWrapper.Response
    @doc false
    defmacro __using__(_) do
        quote location: :keep do
        
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
        
        defoverridable [login: 3]
		end
    end
end
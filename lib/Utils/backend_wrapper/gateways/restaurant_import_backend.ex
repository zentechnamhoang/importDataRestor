defmodule RestaurantImportInfo.BackendWrapper.Gateways.RestaurantImportInfoBackend do
   use RestaurantImportInfo.BackendWrapper.Gateways.Base
   
   alias RestaurantImportInfo.BackendWrapper.Response
   
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
defmodule RestaurantImportInfo.Utils do
    def extract_domain_name(conn) do
    	conn.req_headers |> Enum.find(fn(x) -> elem(x, 0) == "origin" end) |> elem(1)
    end
end
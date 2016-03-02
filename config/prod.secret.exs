use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
config :restaurant_import_info, RestaurantImportInfo.Endpoint,
  secret_key_base: "XW0hWr8N79wh/s7hoUkAa58Q+a6pQh9a6vxqod7gmpCv0rH4z0ZmhYXs7boraUD+"

# Configure your database
config :restaurant_import_info, RestaurantImportInfo.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "restaurant_import_info_prod",
  pool_size: 20

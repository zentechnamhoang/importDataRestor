use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :restaurant_import_info, RestaurantImportInfo.Endpoint,
  http: [port: 3000],
  debug_errors: true,
  code_reloader: true,
  cache_static_lookup: false,
  check_origin: false,
  watchers: [node: ["node_modules/brunch/bin/brunch", "watch", "--stdin"]]

# Watch static and templates for browser reloading.
config :restaurant_import_info, RestaurantImportInfo.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|html)$},
      ~r{web/views/.*(ex)$},
      ~r{web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development.
# Do not configure such in production as keeping
# and calculating stacktraces is usually expensive.
config :phoenix, :stacktrace_depth, 20

# Configure your database
config :restaurant_import_info, RestaurantImportInfo.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "restaurant_import_info_dev",
  hostname: "localhost",
  pool_size: 10
  
config :restaurant_import_info, :backend,
    type: RestaurantImportInfo.BackendWrapper.Gateways.RestaurantImportInfoBackend,
    base_url: "http://52.35.91.120/api/v1"
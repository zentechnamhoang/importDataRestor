defmodule RestaurantImportInfo do
  use Application

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec, warn: false
    
    config_wrapper = Application.get_env(:restaurant_import_info, :backend)
    type_wrapper   = Dict.get(config_wrapper, :type)
    settings_wrapper = %{base_url: Dict.get(config_wrapper, :base_url)}
    
    children = [
      # Start the endpoint when the application starts
      supervisor(RestaurantImportInfo.Endpoint, []),
      # Start the Ecto repository
      worker(RestaurantImportInfo.Repo, []),
      # Here you could define other workers and supervisors as children
      # worker(RestaurantImportInfo.Worker, [arg1, arg2, arg3]),
        worker(RestaurantImportInfo.BackendWrapper.Worker, [type_wrapper, settings_wrapper, [name: :default_wrapper]])
    ]

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: RestaurantImportInfo.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    RestaurantImportInfo.Endpoint.config_change(changed, removed)
    :ok
  end
end

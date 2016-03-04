defmodule Phoenix.Endpoint.CowboyHandler do
  @doc """
  The Cowboy adapter for Phoenix.

  It implements the required `child_spec/3` function as well
  as the handler for the WebSocket transport.

  ## Custom dispatch options

  *NOTE*: This feature depends on the internals of Cowboy 1.0 API
  and how it integrates with Phoenix. Those may change *any time*,
  without backwards compatibility, specially when Cowboy 2.0 is out.
  We document this for clarity and for those with very special needs.

  You can provide custom dispatch options in order to use Phoenix's
  builtin Cowboy server with custom handlers. For example, to handle
  raw WebSockets [as shown in Cowboy's docs](https://github.com/ninenines/cowboy/tree/1.0.x/examples)).

  The options are passed to both `:http` and `:https` keys in the
  endpoint configuration. However, once you pass your custom dispatch
  options, you will need to manually wire all Phoenix endpoints,
  including the socket transports.

  You will need the following rules:

    * Per websocket transport:

          {"/socket/websocket", Phoenix.Endpoint.CowboyWebSocket,
            {MyApp.Endpoint, MyApp.UserSocket, :websocket}}

    * Per longpool transport:

          {"/socket/long_poll", Plug.Adapters.Cowboy.Handler,
            {MyApp.Endpoint, MyApp.UserSocket, :long_pool}}

    * For the endpoint:

          {:_, Plug.Adapters.Cowboy.Handler, {YourApp.Endpoint, []}}

  For example:

      config :myapp, MyApp.Endpoint,
        http: [dispatch: [
                {:_, [
                    {"/foo", MyApp.CustomHandler, []},
                    {"/bar", MyApp.AnotherHandler, []},
                    {:_, Plug.Adapters.Cowboy.Handler, {MyApp.Endpoint, []}}
                  ]}]]

  It is also important to specify your handlers first, otherwise
  Phoenix will intercept the requests before they get to your handler.
  """

  require Logger

  @doc """
  Generates a childspec to be used in the supervision tree.
  """
  def child_spec(scheme, endpoint, config) do
    dispatches =
      for {path, socket} <- endpoint.__sockets__,
          {transport, {module, _config}} <- socket.__transports__,
          handler = module.handlers[:cowboy],
          do: {Path.join(path, Atom.to_string(transport)),
               handler,
               {module, {endpoint, socket, transport}}}

    dispatches =
      dispatches ++ [{:_, Plug.Adapters.Cowboy.Handler, {endpoint, []}}]

    # Use put_new to allow custom dispatches
    config = Keyword.put_new(config, :dispatch, [{:_, dispatches}])

    {ref, mfa, type, timeout, kind, modules} =
      Plug.Adapters.Cowboy.child_spec(scheme, endpoint, [], config)

    # Rewrite MFA for proper error reporting
    mfa = {__MODULE__, :start_link, [scheme, endpoint, config, mfa]}
    {ref, mfa, type, timeout, kind, modules}
  end

  @doc """
  Callback to start the Cowboy endpoint.
  """
  def start_link(scheme, endpoint, config, {m, f, a}) do
    case apply(m, f, a) do
      {:ok, pid} ->
        Logger.info info(scheme, endpoint, config)
        {:ok, pid}

      {:error, {:shutdown, {_, _, {{_, {:error, :eaddrinuse}}, _}}}} = error ->
        Logger.error [info(scheme, endpoint, config), " failed, port already in use"]
        error

      {:error, _} = error ->
        error
    end
  end

  defp info(scheme, endpoint, config) do
    port = config[:port]
    host = endpoint.config(:url)[:host] || "localhost"
    "Running #{inspect endpoint} with Cowboy on #{scheme}://#{host}:#{port}"
  end
end

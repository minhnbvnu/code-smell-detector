function CollectorAPI(agent) {
  this._agent = agent
  this._reqHeadersMap = null

  const initialEndpoint = {
    host: agent.config.host,
    port: agent.config.port
  }

  /* RemoteMethods can be reused and have little per-object state, so why not
   * save some GC time?
   */
  this._methods = {}
  for (const name of [
    'preconnect',
    'connect',
    'agent_settings',
    'error_data',
    'metric_data',
    'transaction_sample_data',
    'shutdown',
    'analytic_event_data',
    'custom_event_data',
    'sql_trace_data',
    'error_event_data',
    'span_event_data',
    'log_event_data'
  ]) {
    const method = new RemoteMethod(name, agent, initialEndpoint)
    this._methods[name] = method
  }
}
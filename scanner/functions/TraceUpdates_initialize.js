function TraceUpdates_initialize(injectedAgent) {
  TraceUpdates_agent = injectedAgent;
  TraceUpdates_agent.addListener('traceUpdates', traceUpdates);
}
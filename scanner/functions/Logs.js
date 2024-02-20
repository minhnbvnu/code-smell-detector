function Logs(agent) {
  this.maxLimit = agent.config.event_harvest_config.harvest_limits.log_event_data
  this.aggregator = agent.logs
  this.storage = []
}
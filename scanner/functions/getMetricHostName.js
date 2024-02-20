function getMetricHostName(agent, host) {
  return urltils.isLocalhost(host) ? agent.config.getHostnameSafe() : host
}
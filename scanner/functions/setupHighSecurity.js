function setupHighSecurity(agent) {
  agent.config.high_security = true
  agent.config._applyHighSecurity()
  agent.config.emit('attributes.include')
}
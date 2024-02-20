function RemoteMethod(name, agent, endpoint) {
  if (!name) {
    throw new TypeError('Must include name of method to invoke on collector.')
  }
  if (!agent) {
    throw new TypeError('Must include an agent instance.')
  }

  this.name = name
  this._config = agent.config
  this._agent = agent
  this._protocolVersion = 17

  this.endpoint = endpoint
}
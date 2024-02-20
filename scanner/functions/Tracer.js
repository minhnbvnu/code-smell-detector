function Tracer(agent, contextManager) {
  if (!agent) {
    throw new Error('Must be initialized with an agent.')
  }

  this.agent = agent
  this._contextManager = contextManager
}
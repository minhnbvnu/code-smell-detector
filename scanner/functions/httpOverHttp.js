function httpOverHttp(options) {
  var agent = new TunnelingAgent(options)
  agent.request = http.request
  return agent
}
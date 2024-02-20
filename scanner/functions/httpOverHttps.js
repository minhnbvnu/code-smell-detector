function httpOverHttps(options) {
  var agent = new TunnelingAgent(options)
  agent.request = https.request
  return agent
}
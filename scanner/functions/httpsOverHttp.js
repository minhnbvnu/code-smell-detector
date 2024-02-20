function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options)
  agent.request = http.request
  agent.createSocket = createSecureSocket
  agent.defaultPort = 443
  return agent
}
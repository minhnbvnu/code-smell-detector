function setupAgentApi() {
    agent = helper.loadMockedAgent()
    api = new API(agent)

    agent.config.attributes.enabled = true
  }
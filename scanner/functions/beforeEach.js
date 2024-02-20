function beforeEach() {
    agent = helper.loadMockedAgent({
      attributes: {
        enabled: true,
        include: ['request.parameters.*']
      }
    })
    agent.config.emit('attributes.include')
    txn = new Transaction(agent)
  }
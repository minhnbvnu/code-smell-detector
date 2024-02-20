function instrumentClientCommand(shim, client, cmd) {
  const { agent } = shim

  shim.recordOperation(client, cmd, function wrapCommand(_shim, _fn, _fnName, args) {
    const [key, value] = args
    const parameters = Object.assign({}, client[opts])
    // If selecting a database, subsequent commands
    // will be using said database, update the clientOptions
    // but not the current parameters(feature parity with v3)
    if (cmd.toLowerCase() === 'select') {
      client[opts].database_name = key
    }
    if (agent.config.attributes.enabled) {
      if (key) {
        parameters.key = JSON.stringify(key)
      }
      if (value) {
        parameters.value = JSON.stringify(value)
      }
    }

    return {
      name: (cmd && cmd.toLowerCase()) || 'other',
      parameters,
      promise: true
    }
  })
}
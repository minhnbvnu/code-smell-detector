function describeMessage(shim, _consumer, _name, args) {
  const [message] = args

  if (!message?.properties) {
    shim.logger.debug({ message: message }, 'Failed to find message in consume arguments.')
    return null
  }

  const parameters = getParameters(Object.create(null), message.fields)
  getParameters(parameters, message.properties)
  let exchangeName = message?.fields?.exchange || 'Default'

  if (TEMP_RE.test(exchangeName)) {
    exchangeName = null
  }

  return {
    destinationName: exchangeName,
    destinationType: shim.EXCHANGE,
    routingKey: message?.fields?.routingKey,
    headers: message.properties.headers,
    parameters
  }
}
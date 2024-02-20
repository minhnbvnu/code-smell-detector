function recordProduce(nodule, properties, recordNamer) {
  if (this.isFunction(properties)) {
    // recordProduce(func, recordNamer)
    recordNamer = properties
    properties = null
  }

  return this.record(nodule, properties, function recordProd(shim) {
    const msgDesc = recordNamer.apply(this, arguments)
    if (!msgDesc) {
      return null
    }

    const name = _nameMessageSegment(shim, msgDesc, shim._metrics.PRODUCE)
    if (!shim.agent.config.message_tracer.segment_parameters.enabled) {
      delete msgDesc.parameters
    } else if (msgDesc.routingKey) {
      msgDesc.parameters = shim.setDefaults(msgDesc.parameters, {
        routing_key: msgDesc.routingKey
      })
    }

    return {
      name: name,
      promise: msgDesc.promise || false,
      callback: msgDesc.callback || null,
      recorder: genericRecorder,
      inContext: function generateCATHeaders() {
        if (msgDesc.headers) {
          shim.insertCATRequestHeaders(msgDesc.headers, true)
        }
      },
      parameters: msgDesc.parameters || null,
      opaque: msgDesc.opaque || false
    }
  })
}
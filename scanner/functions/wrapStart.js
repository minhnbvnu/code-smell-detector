function wrapStart(shim, original) {
  return function wrappedStart() {
    const activeSegment = shim.getActiveSegment()
    if (!activeSegment) {
      return original.apply(this, arguments)
    }

    const channel = this.channel
    const authorityName = (channel.target && channel.target.path) || channel.getDefaultAuthority
    // in 1.8.0 this changed from methodName to method
    const method = this.methodName || this.method

    const segment = shim.createSegment({
      name: `External/${authorityName}${method}`,
      opaque: true,
      recorder: recordExternal(authorityName, 'gRPC')
    })

    return shim.applySegment(callStart, segment, true, this, arguments)

    function callStart() {
      const args = shim.argsToArray.apply(shim, arguments)

      const transaction = segment.transaction

      const originalMetadata = args[0]
      const nrMetadata = originalMetadata.clone()

      const outboundAgentHeaders = Object.create(null)
      if (shim.agent.config.distributed_tracing.enabled) {
        transaction.insertDistributedTraceHeaders(outboundAgentHeaders)
        Object.keys(outboundAgentHeaders).forEach((key) => {
          nrMetadata.add(key, outboundAgentHeaders[key])
        })
      } else {
        shim.logger.debug('Distributed tracing disabled by instrumentation.')
      }

      args[0] = nrMetadata

      const originalListener = args[1]
      const nrListener = Object.assign({}, originalListener)
      nrListener.onReceiveStatus = (status) => {
        const { code, details } = status

        segment.addAttribute('grpc.statusCode', code)
        segment.addAttribute('grpc.statusText', details)

        const agent = shim.agent
        const config = agent.config

        if (shouldTrackError(code, config)) {
          shim.agent.errors.add(segment.transaction, details)
        }

        segment.addAttribute('component', 'gRPC')

        const protocol = 'grpc'

        const url = `${protocol}://${authorityName}${method}`

        segment.addAttribute('http.url', url)
        segment.addAttribute('http.method', method)

        if (originalListener && originalListener.onReceiveStatus) {
          const onReceiveStatuts = shim.bindSegment(originalListener.onReceiveStatus, segment)
          onReceiveStatuts(status)
        }
        segment.end()
      }

      args[1] = nrListener

      return original.apply(this, args)
    }
  }
}
function wrapChannel(shim) {
  const libChannel = shim.require('./lib/channel')
  if (!libChannel?.Channel?.prototype) {
    shim.logger.debug('Could not get Channel class to instrument.')
    return
  }

  const proto = libChannel.Channel.prototype
  if (shim.isWrapped(proto.sendMessage)) {
    shim.logger.trace('Channel already instrumented.')
    return
  }
  shim.logger.trace('Instrumenting basic Channel class.')

  shim.wrap(proto, 'sendOrEnqueue', function wrapSendOrEnqueue(shim, fn) {
    if (!shim.isFunction(fn)) {
      return fn
    }

    return function wrappedSendOrEnqueue() {
      const segment = shim.getSegment()
      const cb = arguments[arguments.length - 1]
      if (!shim.isFunction(cb) || !segment) {
        shim.logger.debug({ cb: !!cb, segment: !!segment }, 'Not binding sendOrEnqueue callback')
        return fn.apply(this, arguments)
      }

      shim.logger.trace('Binding sendOrEnqueue callback to %s', segment.name)
      const args = shim.argsToArray.apply(shim, arguments)
      args[args.length - 1] = shim.bindSegment(cb, segment)
      return fn.apply(this, args)
    }
  })

  shim.recordProduce(proto, 'sendMessage', function recordSendMessage(shim, fn, n, args) {
    const fields = args[0]
    if (!fields) {
      return null
    }
    const isDefault = fields.exchange === ''
    let exchange = 'Default'
    if (!isDefault) {
      exchange = TEMP_RE.test(fields.exchange) ? null : fields.exchange
    }

    return {
      destinationName: exchange,
      destinationType: shim.EXCHANGE,
      routingKey: fields.routingKey,
      headers: fields.headers,
      parameters: getParameters(Object.create(null), fields)
    }
  })
}
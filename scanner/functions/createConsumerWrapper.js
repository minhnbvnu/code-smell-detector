function createConsumerWrapper({ shim, spec, consumer, cName }) {
  return function createConsumeTrans() {
    // If there is no transaction or we're in a pre-existing transaction,
    // then don't do anything. Note that the latter should never happen.
    const args = shim.argsToArray.apply(shim, arguments)
    const tx = shim.tracer.getTransaction()

    if (!tx || tx.baseSegment) {
      shim.logger.debug({ transaction: !!tx }, 'Failed to start message transaction.')
      return consumer.apply(this, args)
    }

    const msgDesc = spec.messageHandler.call(this, shim, consumer, cName, args)

    // If message could not be handled, immediately kill this transaction.
    if (!msgDesc) {
      shim.logger.debug('No description for message, cancelling transaction.')
      tx.setForceIgnore(true)
      tx.end()
      return consumer.apply(this, args)
    }

    // Derive the transaction name.
    shim.setDefaults(msgDesc, spec)
    const txName = _nameMessageTransaction(shim, msgDesc)
    tx.setPartialName(txName)
    tx.baseSegment = shim.createSegment({
      name: tx.getFullName(),
      recorder: messageTransactionRecorder
    })

    // Add would-be baseSegment attributes to transaction trace
    for (const key in msgDesc.parameters) {
      if (props.hasOwn(msgDesc.parameters, key)) {
        tx.trace.attributes.addAttribute(
          ATTR_DESTS.NONE,
          'message.parameters.' + key,
          msgDesc.parameters[key]
        )

        tx.baseSegment.attributes.addAttribute(
          ATTR_DESTS.NONE,
          'message.parameters.' + key,
          msgDesc.parameters[key]
        )
      }
    }

    // If we have a routing key, add it to the transaction. Note that it is
    // camel cased here, but snake cased in the segment parameters.
    if (!shim.agent.config.high_security) {
      if (msgDesc.routingKey) {
        tx.trace.attributes.addAttribute(
          ATTR_DESTS.TRANS_COMMON,
          'message.routingKey',
          msgDesc.routingKey
        )

        tx.baseSegment.addSpanAttribute('message.routingKey', msgDesc.routingKey)
      }
      if (shim.isString(msgDesc.queue)) {
        tx.trace.attributes.addAttribute(
          ATTR_DESTS.TRANS_COMMON,
          'message.queueName',
          msgDesc.queue
        )

        tx.baseSegment.addSpanAttribute('message.queueName', msgDesc.queue)
      }
    }
    if (msgDesc.headers) {
      shim.handleMqTracingHeaders(msgDesc.headers, tx.baseSegment, shim._transportType)
    }

    shim.logger.trace('Started message transaction %s named %s', tx.id, txName)

    // Execute the original function and attempt to hook in the transaction
    // finish.
    let ret = null
    try {
      ret = shim.applySegment(consumer, tx.baseSegment, true, this, args)
    } finally {
      if (shim.isPromise(ret)) {
        shim.logger.trace('Got a promise, attaching tx %s ending to promise', tx.id)
        ret = shim.interceptPromise(ret, endTransaction)
      } else if (!tx.handledExternally) {
        // We have no way of knowing when this transaction ended! ABORT!
        shim.logger.trace('Immediately ending message tx %s', tx.id)
        setImmediate(endTransaction)
      }
    }

    return ret

    /**
     * finalizes transaction name and ends transaction
     */
    function endTransaction() {
      tx.finalizeName(null) // Use existing partial name.
      tx.end()
    }
  }
}
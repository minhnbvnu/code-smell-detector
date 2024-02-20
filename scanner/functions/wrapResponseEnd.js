function wrapResponseEnd(agent, proto) {
  const tracer = agent.tracer

  // On end, we must freeze the current name state to maintain the route that
  // responded and also end the current segment (otherwise it may become truncated).
  shimmer.wrapMethod(proto, 'Response.prototype', 'end', function wrapResEnd(end) {
    if (typeof end !== 'function') {
      logger.debug('Response#end is not a function?')
      return end
    }

    return function wrappedResEnd() {
      const txInfo = this && this[symbols.transactionInfo]
      if (!txInfo) {
        return end.apply(this, arguments)
      }

      if (!txInfo.transaction.isActive()) {
        logger.trace('wrappedResEnd invoked for ended transaction implying multiple invocations.')
        return end.apply(this, arguments)
      }

      // If an error happened, add it to the aggregator.
      if (
        txInfo.error &&
        (!txInfo.errorHandled || urltils.isError(agent.config, this.statusCode))
      ) {
        agent.errors.add(txInfo.transaction, txInfo.error)
      }

      // End all the segments leading up to and including this one.
      for (let i = txInfo.segmentStack.length - 1; i >= 0; --i) {
        txInfo.segmentStack[i].end()
      }
      const segment = tracer.getSegment()
      if (segment) {
        segment.end()
      }

      // Freeze the name state to prevent further changes.
      txInfo.transaction.nameState.freeze()

      return end.apply(this, arguments)
    }
  })
}
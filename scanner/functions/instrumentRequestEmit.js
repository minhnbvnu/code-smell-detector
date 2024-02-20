function instrumentRequestEmit(agent, hostname, segment, request) {
  shimmer.wrapMethod(request, 'request.emit', 'emit', function wrapEmit(emit) {
    const boundEmit = agent.tracer.bindFunction(emit, segment)
    return function wrappedRequestEmit(evnt, arg) {
      if (evnt === 'error') {
        segment.end()
        handleError(segment, request, arg)
      } else if (evnt === 'response') {
        handleResponse(segment, hostname, arg)
      }

      return boundEmit.apply(this, arguments)
    }
  })

  _makeNonEnumerable(request, 'emit')
}
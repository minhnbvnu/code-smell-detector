function middlewareWithPromiseRecorder({ spec, typeDetails, metricName, isErrorWare }) {
  return function promiseRecorder(shim, fn, fnName, args) {
    const route = getRoute(spec, shim)

    // Pull out the request object.
    const req = getReq(spec, shim).call(this, shim, fn, fnName, args)
    const txInfo = assignTxInfo({ shim, req, route, fnName, isErrorWare })

    if (!txInfo || !txInfo.transaction) {
      return null
    }

    const params = copyParams.call(this, { spec, shim, fn, fnName, args, req })
    // Append this middleware's mount point and possibly construct a recorder.
    if (spec.appendPath) {
      txInfo.transaction.nameState.appendPath(route, params)
    }

    const recorder = constructRecorder({ txInfo, typeDetails, shim, metricName })
    const nextWrapper = wrapNextHandler({
      shim,
      spec,
      route,
      args,
      isErrorWare,
      isPromise: true,
      txInfo
    })
    const segmentName = getSegmentName(metricName, typeDetails, route)

    // Finally, return the segment descriptor.
    return {
      name: segmentName,
      parent: txInfo.segmentStack[txInfo.segmentStack.length - 1],
      promise: spec.promise,
      callback: nextWrapper,
      recorder: recorder,
      parameters: params,
      after: function afterExec(shim, _fn, _name, err, result) {
        if (shim._responsePredicate(args, result)) {
          txInfo.transaction.nameState.freeze()
        }
        if (isError(shim, err)) {
          assignError(txInfo, err)
        } else {
          txInfo.errorHandled = true

          if (spec.appendPath) {
            txInfo.transaction.nameState.popPath(route)
          }
        }
        txInfo.segmentStack.pop()
      }
    }
  }
}
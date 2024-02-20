function middlewareWithCallbackRecorder({ spec, typeDetails, metricName, isErrorWare }) {
  return function callbackRecorder(shim, fn, fnName, args) {
    const route = getRoute(spec, shim)
    // Pull out the request object.
    const req = getReq(spec, shim).call(this, shim, fn, fnName, args)

    const txInfo = assignTxInfo({ shim, req, route, fnName, isErrorWare })

    if (!txInfo || !txInfo.transaction) {
      return null
    }

    const params = copyParams.call(this, { spec, shim, fn, fnName, args, req })
    const nextWrapper = wrapNextHandler({
      shim,
      spec,
      route,
      args,
      isErrorWare,
      isPromise: false,
      txInfo
    })

    // Append this middleware's mount point if it's not an errorware...
    // (to avoid doubling up, a la 'WebTransaction/Expressjs/GET//test/test')
    if (!isErrorWare && spec.appendPath) {
      txInfo.transaction.nameState.appendPath(route, params)
    }

    const recorder = constructRecorder({ txInfo, typeDetails, shim, metricName })

    const segmentName = getSegmentName(metricName, typeDetails, route)

    // Finally, return the segment descriptor.
    return {
      name: segmentName,
      callback: nextWrapper,
      parent: txInfo.segmentStack[txInfo.segmentStack.length - 1],
      recorder: recorder,
      parameters: params,
      after: function afterExec(shim, _fn, _name, err) {
        const errIsError = isError(shim, err)
        if (errIsError) {
          assignError(txInfo, err)
        } else if (!nextWrapper && !isErrorWare && spec.appendPath) {
          txInfo.transaction.nameState.popPath(route)
        }
        if (errIsError || !nextWrapper) {
          txInfo.segmentStack.pop()
        }
      }
    }
  }
}
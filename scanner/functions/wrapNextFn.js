function wrapNextFn({ shim, txInfo, nextDetails, segment }, nodule, property, isFinal) {
  shim.wrap(nodule, property, function wrapper(shim, original) {
    const parentSegment = segment || shim.getSegment()
    return shim.bindSegment(function boundNext(err) {
      // Only pop the stack if we didn't error. This way the transaction
      // name is derived from the failing middleware.
      if (isError(shim, err)) {
        assignError(txInfo, err)
      } else if (!isFinal && !nextDetails.isErrorWare && nextDetails.appendPath) {
        segment.transaction.nameState.popPath(nextDetails.route)
      }

      // The next call does not signify the end of the segment
      // calling next in the promise case.  Keep the segment on the
      // stack and wait for its promise to be resolved to end it.
      if (!nextDetails.isPromise) {
        txInfo.segmentStack.pop()
        segment.end()
      }
      const ret = original.apply(this, arguments)

      if (nextDetails.isPromise && shim.isPromise(ret)) {
        // After the next call has resolved, we should reinstate the
        // segment responsible for calling next in case there is
        // more work to do in that scope.
        return ret.then(function onNextFinish(v) {
          if (nextDetails.appendPath) {
            segment.transaction.nameState.appendPath(nextDetails.route)
          }

          txInfo.segmentStack.push(segment)

          return v
        })
      }

      return ret
    }, parentSegment) // Bind to parent.
  })
}
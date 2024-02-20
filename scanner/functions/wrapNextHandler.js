function wrapNextHandler({ shim, spec, route, args, isErrorWare, isPromise, txInfo }) {
  let nextWrapper = null

  if (isPromise) {
    nextWrapper = function pushSegment(_shim, _fn, _name, segment) {
      txInfo.segmentStack.push(segment)
    }
  }

  if (shim.isFunction(spec.next)) {
    const nextDetails = {
      route,
      wrapNext: spec.next,
      isErrorWare,
      isPromise,
      appendPath: spec.appendPath
    }

    nextWrapper = _makeNextBinder(nextDetails, txInfo)
  } else {
    const nextIdx = shim.normalizeIndex(args.length, spec.next)
    if (nextIdx !== null && args[nextIdx] instanceof Function) {
      const nextDetails = {
        route,
        wrapNext: function wrapNext(s, f, n, _args, wrap) {
          wrap(_args, nextIdx)
        },
        isErrorWare,
        isPromise,
        appendPath: spec.appendPath
      }

      nextWrapper = _makeNextBinder(nextDetails, txInfo)
    }
  }

  return nextWrapper
}
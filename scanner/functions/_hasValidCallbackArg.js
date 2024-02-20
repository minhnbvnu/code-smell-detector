function _hasValidCallbackArg(shim, args, specCallback) {
  if (shim.isNumber(specCallback)) {
    const cbIdx = normalizeIndex(args.length, specCallback)
    if (cbIdx === null) {
      return false
    }

    const callback = args[cbIdx]
    return shim.isFunction(callback)
  }

  return true
}
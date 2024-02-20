function applyDebugState(shim, nodule, inEsm) {
  if (shimmer.debug) {
    shim.enableDebug()
    instrumented.push(shim)
    if (!inEsm) {
      instrumented.push({
        [symbols.unwrap]: function unwrapNodule() {
          delete nodule[symbols.shim]
        }
      })
      nodule[symbols.shim] = shim
    }
  }
}
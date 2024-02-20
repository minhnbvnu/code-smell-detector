function instrumentTimerMethods(shim, pkgs) {
  pkgs.forEach((nodule) => {
    if (shim.isWrapped(nodule.setTimeout)) {
      return
    }

    const asynchronizers = ['setTimeout', 'setInterval']
    shim.record(nodule, asynchronizers, recordAsynchronizers)
    shim.wrap(nodule, 'clearTimeout', wrapClearTimeout)
    makeWrappedPromisifyCompatible(shim, nodule)
  })
}
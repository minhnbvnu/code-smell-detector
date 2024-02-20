function makeWrappedPromisifyCompatible(shim, nodule) {
  copySymbols(shim, nodule, 'setTimeout')
  copySymbols(shim, nodule, 'setInterval')
}
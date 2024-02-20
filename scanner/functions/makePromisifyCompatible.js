function makePromisifyCompatible(shim, childProcess) {
  const originalExec = shim.getOriginal(childProcess.exec)
  Object.getOwnPropertySymbols(originalExec).forEach((symbol) => {
    childProcess.exec[symbol] = originalExec[symbol]
  })

  const originalExecFile = shim.getOriginal(childProcess.execFile)
  Object.getOwnPropertySymbols(originalExecFile).forEach((symbol) => {
    childProcess.execFile[symbol] = originalExecFile[symbol]
  })
}
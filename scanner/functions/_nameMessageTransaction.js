function _nameMessageTransaction(shim, msgDesc) {
  let name = shim._metrics.LIBRARY + '/' + (msgDesc.destinationType || shim.EXCHANGE) + '/'

  if (msgDesc.destinationName) {
    name += shim._metrics.NAMED + msgDesc.destinationName
  } else {
    name += shim._metrics.TEMP
  }

  return name
}
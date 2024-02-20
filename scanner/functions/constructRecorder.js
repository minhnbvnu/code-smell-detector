function constructRecorder({ txInfo, typeDetails, shim, metricName }) {
  let recorder = null
  if (typeDetails.record) {
    const stackPath = txInfo.transaction.nameState.getPath() || ''
    recorder = _makeMiddlewareRecorder(shim, metricName + '/' + stackPath)
  }
  return recorder
}
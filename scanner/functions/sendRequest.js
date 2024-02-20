function sendRequest() {
    seajs.request(emitData.requestUri, emitData.onRequest, emitData.charset, emitData.crossorigin)
  }
function makeProxyLayer(layer) {
  const fakeLayer = {
    handle_request: function () {
      layer.handle_request.apply(layer, arguments)
    },
    handle_error: function () {
      layer.handle_error.apply(layer, arguments)
    }
  }
  Object.keys(layer).forEach(function (k) {
    if (!fakeLayer[k]) {
      fakeLayer[k] = layer[k]
    }
  })
  Object.keys(layer.constructor.prototype).forEach(function (k) {
    if (!fakeLayer[k]) {
      fakeLayer[k] = layer[k]
    }
  })
  return fakeLayer
}
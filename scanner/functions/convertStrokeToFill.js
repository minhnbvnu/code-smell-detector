function convertStrokeToFill(rootObject) {

  rootObject.children().forEach(layer => {
    if (layer.canConvertToOutlines() && String(layer.name()) !== 'delete-me') {
      layer.layersByConvertingToOutlines()
    }
  })

  rootObject.children().forEach(layer => {
    layer.usedStyle().disableAllBorders()
  })
}
function getSelectedArtboardsAndSymbols(context) {
  let selectedArtboardsAndSymbols = []

  context.selection.forEach(function (layer) {
    let className = String(layer.class())
    if (className !== 'MSArtboardGroup' || className !== 'MSSymbolMaster') {
      layer = layer.parentRoot()
      className = String(layer.class())
    }

    if (selectedArtboardsAndSymbols.indexOf(String(layer.objectID())) === -1 && (className === 'MSArtboardGroup' || className === 'MSSymbolMaster')) {
      selectedArtboardsAndSymbols.push({
        'object': layer,
        'type': className,
        'id': layer.objectID()
      })
    }
  })

  selectedArtboardsAndSymbols = selectedArtboardsAndSymbols.filter((rootElement, index, self) =>
    index === self.findIndex((compareElement) => (
      compareElement.id === rootElement.id
    ))
  )

  return selectedArtboardsAndSymbols
}
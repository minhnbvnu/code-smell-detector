function applyColor(rootObject, params) {
  const color = (params.colorPicker) ? params.colorPicker : librariesProvider.getColorFromSymbol(params.color).color
  rootObject.children().forEach((layer) => {
    if (layer.usedStyle().hasEnabledBorder()) {
      const style = layer.usedStyle()
      style.enabledBorders().forEach((border) => border.color = color)
    }
  })
}
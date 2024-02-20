function svgHasStroke(rootObject) {
  let hasBorder = false
  rootObject.children().forEach((layer) => {
    if (layer.usedStyle().hasEnabledBorder()) {
      hasBorder = true
    }
  });

  return hasBorder
}
function getBorderColor(rootObject) {
  let color;
  const layers = rootObject.children()

  for (let i = 0; i < layers.length; i++) {
    let style = layers[i].usedStyle()
    color = style.firstEnabledBorder()
    if (color) break
  }

  return color
}
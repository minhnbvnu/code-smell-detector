function fontSpec(fontSize, font) {
  let styleSpec = font.styleName === 'Regular' ? '' : `${font.styleName} `
  let fontSizeSpec = `${fontSize}px `
  let name = font.familyName
  return styleSpec + fontSizeSpec + name
}
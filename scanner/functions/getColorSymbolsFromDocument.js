function getColorSymbolsFromDocument(document) {
  const result = []
  document.localSymbols().forEach(function (symbol) {
    const color = getColorFromSymbol(symbol)
    if (color) result.push(color)
  })

  return result
}
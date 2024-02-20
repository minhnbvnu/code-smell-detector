function getColorFromSymbol(symbol) {
  const layers = symbol.layers();
  let result;

  if (layers.length === 0 && symbol.backgroundColor()) {
    result = {
      color: symbol.backgroundColor(),
      symbol: symbol
    }
  } else if (layers.length === 1 && layers[0].children().length === 1 && layers[0].style().hasEnabledFill()) {

    result = {
      color: layers[0].style().fills()[0].color(),
      symbol: symbol
    }
  }

  return result
}
function getSymbolFromDocument(document, symbolId) {

  let symbol, localSymbols = document.localSymbols();

  for (let i = 0; i < localSymbols.length; i++) {
    if (String(localSymbols[i].symbolID()) === String(symbolId)) {
      symbol = localSymbols[i]
      break
    }
  }

  return symbol
}
function getParentSymbols(symbol) {
	var newSym = symbol;
	var result = [];
	while (newSym) {
    newSym = JSDOC.Parser.symbols.getSymbol(newSym.augments);
    if (!newSym) break;
    result.unshift(newSym);
  }
	return result;
}
function getParentNamespaces(symbol) {
  var namespaces = symbol.alias.split('.').slice(0, -1);
  var symbols = [];
  while (namespaces.length) {
    symbols.push(JSDOC.Parser.symbols.getSymbol(namespaces.join('.')));
    namespaces.pop();
  }
  return symbols;
}
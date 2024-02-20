function visitSymbol(symbol) {
                    if (!symbol) {
                        return false;
                    }
                    const symbolId = getSymbolId(symbol);
                    if (visitedSymbols[symbolId]) {
                        return false;
                    }
                    visitedSymbols[symbolId] = symbol;
                    if (!accept(symbol)) {
                        return true;
                    }
                    const t = getTypeOfSymbol(symbol);
                    visitType(t);
                    if (symbol.exports) {
                        symbol.exports.forEach(visitSymbol);
                    }
                    forEach(symbol.declarations, (d) => {
                        if (d.type && d.type.kind === 183 /* TypeQuery */) {
                            const query = d.type;
                            const entity = getResolvedSymbol(getFirstIdentifier2(query.exprName));
                            visitSymbol(entity);
                        }
                    });
                    return false;
                }
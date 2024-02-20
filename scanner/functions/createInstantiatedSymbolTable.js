function createInstantiatedSymbolTable(symbols, mapper, mappingThisOnly) {
                const result = createSymbolTable();
                for (const symbol of symbols) {
                    result.set(symbol.escapedName, mappingThisOnly && isThisless(symbol) ? symbol : instantiateSymbol(symbol, mapper));
                }
                return result;
            }
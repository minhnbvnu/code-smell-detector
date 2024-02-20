function getMergedSymbol(symbol) {
                let merged;
                return symbol && symbol.mergeId && (merged = mergedSymbols[symbol.mergeId]) ? merged : symbol;
            }
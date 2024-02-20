function createSymbolTable(symbols) {
            const result = /* @__PURE__ */ new Map();
            if (symbols) {
                for (const symbol of symbols) {
                    result.set(symbol.escapedName, symbol);
                }
            }
            return result;
        }
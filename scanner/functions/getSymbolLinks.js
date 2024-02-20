function getSymbolLinks(symbol) {
                var _a2;
                if (symbol.flags & 33554432 /* Transient */)
                    return symbol.links;
                const id = getSymbolId(symbol);
                return (_a2 = symbolLinks[id]) != null ? _a2 : symbolLinks[id] = new SymbolLinks();
            }
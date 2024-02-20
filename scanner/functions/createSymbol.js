function createSymbol(flags, name, checkFlags) {
                symbolCount++;
                const symbol = new Symbol46(flags | 33554432 /* Transient */, name);
                symbol.links = new SymbolLinks();
                symbol.links.checkFlags = checkFlags || 0 /* None */;
                return symbol;
            }
function getAllSymbolFlags(symbol) {
                let flags = symbol.flags;
                let seenSymbols;
                while (symbol.flags & 2097152 /* Alias */) {
                    const target = resolveAlias(symbol);
                    if (target === unknownSymbol) {
                        return 67108863 /* All */;
                    }
                    if (target === symbol || (seenSymbols == null ? void 0 : seenSymbols.has(target))) {
                        break;
                    }
                    if (target.flags & 2097152 /* Alias */) {
                        if (seenSymbols) {
                            seenSymbols.add(target);
                        }
                        else {
                            seenSymbols = /* @__PURE__ */ new Set([symbol, target]);
                        }
                    }
                    flags |= target.flags;
                    symbol = target;
                }
                return flags;
            }
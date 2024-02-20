function getSymbolModifiers(typeChecker, symbol) {
            if (!symbol) {
                return "" /* none */;
            }
            const modifiers = new Set(getNormalizedSymbolModifiers(symbol));
            if (symbol.flags & 2097152 /* Alias */) {
                const resolvedSymbol = typeChecker.getAliasedSymbol(symbol);
                if (resolvedSymbol !== symbol) {
                    forEach(getNormalizedSymbolModifiers(resolvedSymbol), (modifier) => {
                        modifiers.add(modifier);
                    });
                }
            }
            if (symbol.flags & 16777216 /* Optional */) {
                modifiers.add("optional" /* optionalModifier */);
            }
            return modifiers.size > 0 ? arrayFrom(modifiers.values()).join(",") : "" /* none */;
        }
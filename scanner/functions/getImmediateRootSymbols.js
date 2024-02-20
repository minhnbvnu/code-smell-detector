function getImmediateRootSymbols(symbol) {
                if (getCheckFlags(symbol) & 6 /* Synthetic */) {
                    return mapDefined(getSymbolLinks(symbol).containingType.types, (type) => getPropertyOfType(type, symbol.escapedName));
                }
                else if (symbol.flags & 33554432 /* Transient */) {
                    const { links: { leftSpread, rightSpread, syntheticOrigin } } = symbol;
                    return leftSpread ? [leftSpread, rightSpread] : syntheticOrigin ? [syntheticOrigin] : singleElementArray(tryGetTarget(symbol));
                }
                return void 0;
            }
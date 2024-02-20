function declareClassMember(node, symbolFlags, symbolExcludes) {
                return isStatic(node) ? declareSymbol(container.symbol.exports, container.symbol, node, symbolFlags, symbolExcludes) : declareSymbol(container.symbol.members, container.symbol, node, symbolFlags, symbolExcludes);
            }
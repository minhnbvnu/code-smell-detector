function bindAnonymousDeclaration(node, symbolFlags, name) {
                const symbol = createSymbol(symbolFlags, name);
                if (symbolFlags & (8 /* EnumMember */ | 106500 /* ClassMember */)) {
                    symbol.parent = container.symbol;
                }
                addDeclarationToSymbol(symbol, node, symbolFlags);
                return symbol;
            }
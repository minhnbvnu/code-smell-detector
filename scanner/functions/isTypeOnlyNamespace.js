function isTypeOnlyNamespace(symbol) {
                        return every(getNamespaceMembersForSerialization(symbol), (m) => !(getAllSymbolFlags(resolveSymbol(m)) & 111551 /* Value */));
                    }
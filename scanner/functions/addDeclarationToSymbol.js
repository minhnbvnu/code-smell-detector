function addDeclarationToSymbol(symbol, node, symbolFlags) {
                symbol.flags |= symbolFlags;
                node.symbol = symbol;
                symbol.declarations = appendIfUnique(symbol.declarations, node);
                if (symbolFlags & (32 /* Class */ | 384 /* Enum */ | 1536 /* Module */ | 3 /* Variable */) && !symbol.exports) {
                    symbol.exports = createSymbolTable();
                }
                if (symbolFlags & (32 /* Class */ | 64 /* Interface */ | 2048 /* TypeLiteral */ | 4096 /* ObjectLiteral */) && !symbol.members) {
                    symbol.members = createSymbolTable();
                }
                if (symbol.constEnumOnlyModule && symbol.flags & (16 /* Function */ | 32 /* Class */ | 256 /* RegularEnum */)) {
                    symbol.constEnumOnlyModule = false;
                }
                if (symbolFlags & 111551 /* Value */) {
                    setValueDeclaration(symbol, node);
                }
            }
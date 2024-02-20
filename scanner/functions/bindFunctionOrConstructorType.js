function bindFunctionOrConstructorType(node) {
                const symbol = createSymbol(131072 /* Signature */, getDeclarationName(node));
                addDeclarationToSymbol(symbol, node, 131072 /* Signature */);
                const typeLiteralSymbol = createSymbol(2048 /* TypeLiteral */, "__type" /* Type */);
                addDeclarationToSymbol(typeLiteralSymbol, node, 2048 /* TypeLiteral */);
                typeLiteralSymbol.members = createSymbolTable();
                typeLiteralSymbol.members.set(symbol.escapedName, symbol);
            }
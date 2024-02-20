function tryReplaceWithQualifiedNameOrPropertyAccess(symbol, scopeDecl, isTypeNode2) {
                if (!symbol) {
                    return void 0;
                }
                const decls = symbol.getDeclarations();
                if (decls && decls.some((d) => d.parent === scopeDecl)) {
                    return factory.createIdentifier(symbol.name);
                }
                const prefix = tryReplaceWithQualifiedNameOrPropertyAccess(symbol.parent, scopeDecl, isTypeNode2);
                if (prefix === void 0) {
                    return void 0;
                }
                return isTypeNode2 ? factory.createQualifiedName(prefix, factory.createIdentifier(symbol.name)) : factory.createPropertyAccessExpression(prefix, symbol.name);
            }
function isPropertyOrMethodDeclarationSymbol(symbol) {
                if (symbol.declarations && symbol.declarations.length) {
                    for (const declaration of symbol.declarations) {
                        switch (declaration.kind) {
                            case 169 /* PropertyDeclaration */:
                            case 171 /* MethodDeclaration */:
                            case 174 /* GetAccessor */:
                            case 175 /* SetAccessor */:
                                continue;
                            default:
                                return false;
                        }
                    }
                    return true;
                }
                return false;
            }
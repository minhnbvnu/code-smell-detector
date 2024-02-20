function getDeclarationOfKind(symbol, kind) {
            const declarations = symbol.declarations;
            if (declarations) {
                for (const declaration of declarations) {
                    if (declaration.kind === kind) {
                        return declaration;
                    }
                }
            }
            return void 0;
        }
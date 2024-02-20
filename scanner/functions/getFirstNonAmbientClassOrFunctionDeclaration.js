function getFirstNonAmbientClassOrFunctionDeclaration(symbol) {
                const declarations = symbol.declarations;
                if (declarations) {
                    for (const declaration of declarations) {
                        if ((declaration.kind === 260 /* ClassDeclaration */ || declaration.kind === 259 /* FunctionDeclaration */ && nodeIsPresent(declaration.body)) && !(declaration.flags & 16777216 /* Ambient */)) {
                            return declaration;
                        }
                    }
                }
                return void 0;
            }
function isFunctionSymbol(symbol) {
            if (!symbol || !symbol.valueDeclaration) {
                return false;
            }
            const decl = symbol.valueDeclaration;
            return decl.kind === 259 /* FunctionDeclaration */ || isVariableDeclaration(decl) && decl.initializer && isFunctionLike(decl.initializer);
        }
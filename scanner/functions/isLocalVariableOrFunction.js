function isLocalVariableOrFunction(symbol) {
            if (symbol.parent) {
                return false;
            }
            return forEach(symbol.declarations, (declaration) => {
                if (declaration.kind === 215 /* FunctionExpression */) {
                    return true;
                }
                if (declaration.kind !== 257 /* VariableDeclaration */ && declaration.kind !== 259 /* FunctionDeclaration */) {
                    return false;
                }
                for (let parent2 = declaration.parent; !isFunctionBlock(parent2); parent2 = parent2.parent) {
                    if (parent2.kind === 308 /* SourceFile */ || parent2.kind === 265 /* ModuleBlock */) {
                        return false;
                    }
                }
                return true;
            });
        }
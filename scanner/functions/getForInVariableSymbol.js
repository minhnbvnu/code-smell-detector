function getForInVariableSymbol(node) {
                const initializer = node.initializer;
                if (initializer.kind === 258 /* VariableDeclarationList */) {
                    const variable = initializer.declarations[0];
                    if (variable && !isBindingPattern(variable.name)) {
                        return getSymbolOfDeclaration(variable);
                    }
                }
                else if (initializer.kind === 79 /* Identifier */) {
                    return getResolvedSymbol(initializer);
                }
                return void 0;
            }
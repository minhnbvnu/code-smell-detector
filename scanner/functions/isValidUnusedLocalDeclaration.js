function isValidUnusedLocalDeclaration(declaration) {
                if (isBindingElement(declaration)) {
                    if (isObjectBindingPattern(declaration.parent)) {
                        return !!(declaration.propertyName && isIdentifierThatStartsWithUnderscore(declaration.name));
                    }
                    return isIdentifierThatStartsWithUnderscore(declaration.name);
                }
                return isAmbientModule(declaration) || (isVariableDeclaration(declaration) && isForInOrOfStatement(declaration.parent.parent) || isImportedDeclaration(declaration)) && isIdentifierThatStartsWithUnderscore(declaration.name);
            }
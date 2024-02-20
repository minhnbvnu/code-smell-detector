function isFirstEmittedDeclarationInScope(node) {
                if (currentScopeFirstDeclarationsOfName) {
                    const name = declaredNameInScope(node);
                    return currentScopeFirstDeclarationsOfName.get(name) === node;
                }
                return true;
            }
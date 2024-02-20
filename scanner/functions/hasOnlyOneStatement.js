function hasOnlyOneStatement(statementType, declarations) {
                const declarationCounts = countDeclarations(declarations);
                const currentOptions = options[statementType] || {};
                const currentScope = getCurrentScope(statementType);
                const hasRequires = declarations.some(isRequire);
                if (currentOptions.uninitialized === MODE_ALWAYS && currentOptions.initialized === MODE_ALWAYS) {
                    if (currentScope.uninitialized || currentScope.initialized) {
                        if (!hasRequires) {
                            return false;
                        }
                    }
                }
                if (declarationCounts.uninitialized > 0) {
                    if (currentOptions.uninitialized === MODE_ALWAYS && currentScope.uninitialized) {
                        return false;
                    }
                }
                if (declarationCounts.initialized > 0) {
                    if (currentOptions.initialized === MODE_ALWAYS && currentScope.initialized) {
                        if (!hasRequires) {
                            return false;
                        }
                    }
                }
                if (currentScope.required && hasRequires) {
                    return false;
                }
                recordTypes(statementType, declarations, currentScope);
                return true;
            }
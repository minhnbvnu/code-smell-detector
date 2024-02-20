function isAnyImportOrBareOrAccessedRequire(node) {
            return isAnyImportSyntax(node) || isVariableDeclarationInitializedToBareOrAccessedRequire(node);
        }
function isVariableDeclarationInitializedToBareOrAccessedRequire(node) {
            return isVariableDeclarationInitializedWithRequireHelper(node, 
            /*allowAccessedRequire*/
            true);
        }
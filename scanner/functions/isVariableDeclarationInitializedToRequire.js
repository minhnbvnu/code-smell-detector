function isVariableDeclarationInitializedToRequire(node) {
            return isVariableDeclarationInitializedWithRequireHelper(node, 
            /*allowAccessedRequire*/
            false);
        }
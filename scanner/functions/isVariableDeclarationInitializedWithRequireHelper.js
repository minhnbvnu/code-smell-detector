function isVariableDeclarationInitializedWithRequireHelper(node, allowAccessedRequire) {
            return isVariableDeclaration(node) && !!node.initializer && isRequireCall(allowAccessedRequire ? getLeftmostAccessExpression(node.initializer) : node.initializer, 
            /*requireStringLiteralLikeArgument*/
            true);
        }
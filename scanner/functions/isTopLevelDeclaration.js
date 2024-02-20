function isTopLevelDeclaration(node) {
            return isNonVariableTopLevelDeclaration(node) && isSourceFile(node.parent) || isVariableDeclaration(node) && isSourceFile(node.parent.parent.parent);
        }
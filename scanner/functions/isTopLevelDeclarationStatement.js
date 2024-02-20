function isTopLevelDeclarationStatement(node) {
            Debug.assert(isSourceFile(node.parent), "Node parent should be a SourceFile");
            return isNonVariableTopLevelDeclaration(node) || isVariableStatement(node);
        }
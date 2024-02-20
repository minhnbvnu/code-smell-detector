function isRequireVariableStatement(node) {
            return isVariableStatement(node) && node.declarationList.declarations.length > 0 && every(node.declarationList.declarations, (decl) => isVariableDeclarationInitializedToRequire(decl));
        }
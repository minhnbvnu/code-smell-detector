function canDeleteEntireVariableStatement(sourceFile, token) {
            return isVariableDeclarationList(token.parent) && first(token.parent.getChildren(sourceFile)) === token;
        }
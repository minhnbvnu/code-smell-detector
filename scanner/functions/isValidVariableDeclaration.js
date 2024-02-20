function isValidVariableDeclaration(node) {
            return isVariableDeclaration(node) && isVarConst(node) && isIdentifier(node.name) && !node.type;
        }
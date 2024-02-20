function isAssignmentDeclaration(decl) {
            return isBinaryExpression(decl) || isAccessExpression(decl) || isIdentifier(decl) || isCallExpression(decl);
        }
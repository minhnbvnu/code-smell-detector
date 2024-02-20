function isThisTypeAnnotatable(containingFunction) {
            return isFunctionExpression(containingFunction) || isFunctionDeclaration(containingFunction);
        }
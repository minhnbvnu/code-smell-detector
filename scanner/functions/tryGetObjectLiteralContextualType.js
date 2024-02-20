function tryGetObjectLiteralContextualType(node, typeChecker) {
            const type = typeChecker.getContextualType(node);
            if (type) {
                return type;
            }
            const parent2 = walkUpParenthesizedExpressions(node.parent);
            if (isBinaryExpression(parent2) && parent2.operatorToken.kind === 63 /* EqualsToken */ && node === parent2.left) {
                return typeChecker.getTypeAtLocation(parent2);
            }
            if (isExpression(parent2)) {
                return typeChecker.getContextualType(parent2);
            }
            return void 0;
        }
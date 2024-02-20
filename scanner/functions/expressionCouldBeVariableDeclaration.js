function expressionCouldBeVariableDeclaration(expression, checker) {
            if (!isBinaryExpression(expression)) {
                return false;
            }
            if (expression.operatorToken.kind === 27 /* CommaToken */) {
                return every([expression.left, expression.right], (expression2) => expressionCouldBeVariableDeclaration(expression2, checker));
            }
            return expression.operatorToken.kind === 63 /* EqualsToken */ && isIdentifier(expression.left) && !checker.getSymbolAtLocation(expression.left);
        }
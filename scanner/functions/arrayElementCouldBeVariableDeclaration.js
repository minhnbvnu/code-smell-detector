function arrayElementCouldBeVariableDeclaration(expression, checker) {
            const identifier = isIdentifier(expression) ? expression : isAssignmentExpression(expression, 
            /*excludeCompoundAssignment*/
            true) && isIdentifier(expression.left) ? expression.left : void 0;
            return !!identifier && !checker.getSymbolAtLocation(identifier);
        }
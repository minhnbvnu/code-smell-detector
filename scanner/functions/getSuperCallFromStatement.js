function getSuperCallFromStatement(statement) {
            if (!isExpressionStatement(statement)) {
                return void 0;
            }
            const expression = skipParentheses(statement.expression);
            return isSuperCall(expression) ? expression : void 0;
        }
function getOperator(expression) {
            if (expression.kind === 223 /* BinaryExpression */) {
                return expression.operatorToken.kind;
            }
            else if (expression.kind === 221 /* PrefixUnaryExpression */ || expression.kind === 222 /* PostfixUnaryExpression */) {
                return expression.operator;
            }
            else {
                return expression.kind;
            }
        }
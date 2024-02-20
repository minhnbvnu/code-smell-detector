function isLogicalOrCoalescingBinaryExpression(expr) {
            return isBinaryExpression(expr) && isLogicalOrCoalescingBinaryOperator(expr.operatorToken.kind);
        }
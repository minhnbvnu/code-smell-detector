function isLogicalOrCoalescingAssignmentExpression(expr) {
            return isBinaryExpression(expr) && isLogicalOrCoalescingAssignmentOperator(expr.operatorToken.kind);
        }
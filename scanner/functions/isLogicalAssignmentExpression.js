function isLogicalAssignmentExpression(node) {
                return isLogicalOrCoalescingAssignmentExpression(skipParentheses(node));
            }
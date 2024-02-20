function isAssignmentExpression(node, excludeCompoundAssignment) {
            return isBinaryExpression(node) && (excludeCompoundAssignment ? node.operatorToken.kind === 63 /* EqualsToken */ : isAssignmentOperator(node.operatorToken.kind)) && isLeftHandSideExpression(node.left);
        }
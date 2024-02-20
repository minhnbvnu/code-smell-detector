function getSourceOfAssignment(node) {
            return isExpressionStatement(node) && isBinaryExpression(node.expression) && node.expression.operatorToken.kind === 63 /* EqualsToken */ ? getRightMostAssignedExpression(node.expression) : void 0;
        }
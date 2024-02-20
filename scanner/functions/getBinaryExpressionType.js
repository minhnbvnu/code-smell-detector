function getBinaryExpressionType(operator) {
        if (isAssignmentOperator(operator)) {
            return ts_estree_1.AST_NODE_TYPES.AssignmentExpression;
        }
        else if (isLogicalOperator(operator)) {
            return ts_estree_1.AST_NODE_TYPES.LogicalExpression;
        }
        return ts_estree_1.AST_NODE_TYPES.BinaryExpression;
    }
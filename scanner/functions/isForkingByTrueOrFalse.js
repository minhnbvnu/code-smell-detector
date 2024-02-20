function isForkingByTrueOrFalse(node) {
        const parent = node.parent;
        switch (parent.type) {
            case "ConditionalExpression":
            case "IfStatement":
            case "WhileStatement":
            case "DoWhileStatement":
            case "ForStatement":
                return parent.test === node;
            case "LogicalExpression":
                return isHandledLogicalOperator(parent.operator);
            case "AssignmentExpression":
                return isLogicalAssignmentOperator(parent.operator);
            default:
                return false;
        }
    }
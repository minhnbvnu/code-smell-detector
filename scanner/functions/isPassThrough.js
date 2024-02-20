function isPassThrough(node) {
        const parent = node.parent;
        switch (parent && parent.type) {
            case "ConditionalExpression":
                return parent.consequent === node || parent.alternate === node;
            case "LogicalExpression":
                return true;
            case "SequenceExpression":
                return parent.expressions[parent.expressions.length - 1] === node;
            case "ChainExpression":
                return true;
            default:
                return false;
        }
    }
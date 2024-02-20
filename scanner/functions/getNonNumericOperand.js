function getNonNumericOperand(node) {
        const left = node.left, right = node.right;
        if (right.type !== "BinaryExpression" && !isNumeric(right)) {
            return right;
        }
        if (left.type !== "BinaryExpression" && !isNumeric(left)) {
            return left;
        }
        return null;
    }
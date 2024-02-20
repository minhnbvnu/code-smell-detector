function isMultiplyByFractionOfOne(node, sourceCode) {
        return node.type === "BinaryExpression" &&
            node.operator === "*" &&
            (node.right.type === "Literal" && node.right.value === 1) &&
            node.parent.type === "BinaryExpression" &&
            node.parent.operator === "/" &&
            node.parent.left === node &&
            !astUtils.isParenthesised(sourceCode, node);
    }
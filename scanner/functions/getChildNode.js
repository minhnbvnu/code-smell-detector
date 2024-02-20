function getChildNode(node) {
        return node.type === "ConditionalExpression" ? node.test : node.left;
    }
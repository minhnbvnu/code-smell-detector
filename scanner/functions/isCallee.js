function isCallee(node) {
        return node.parent.type === "CallExpression" && node.parent.callee === node;
    }
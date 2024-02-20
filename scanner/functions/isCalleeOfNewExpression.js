function isCalleeOfNewExpression(node) {
        const maybeCallee = node.parent.type === "ChainExpression"
            ? node.parent
            : node;
        return (maybeCallee.parent.type === "NewExpression" &&
            maybeCallee.parent.callee === maybeCallee);
    }
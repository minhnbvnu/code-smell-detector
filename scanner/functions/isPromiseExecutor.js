function isPromiseExecutor(node, scope) {
        const parent = node.parent;
        return parent.type === "NewExpression" &&
            parent.arguments[0] === node &&
            parent.callee.type === "Identifier" &&
            parent.callee.name === "Promise" &&
            isGlobalReference(parent.callee, getOuterScope(scope));
    }
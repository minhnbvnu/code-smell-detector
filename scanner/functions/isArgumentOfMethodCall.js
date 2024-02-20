function isArgumentOfMethodCall(node, index, object, property) {
        const parent = node.parent;
        return (parent.type === "CallExpression" &&
            astUtils.isSpecificMemberAccess(parent.callee, object, property) &&
            parent.arguments[index] === node);
    }
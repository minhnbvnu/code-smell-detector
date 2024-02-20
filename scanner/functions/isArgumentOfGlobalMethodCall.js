function isArgumentOfGlobalMethodCall(node, scope, objectName, methodName, index) {
        const callNode = node.parent;
        return callNode.type === "CallExpression" &&
            callNode.arguments[index] === node &&
            astUtils.isSpecificMemberAccess(callNode.callee, objectName, methodName) &&
            isGlobalReference(astUtils.skipChainExpression(callNode.callee).object, scope);
    }
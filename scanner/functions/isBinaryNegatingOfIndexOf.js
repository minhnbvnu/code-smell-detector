function isBinaryNegatingOfIndexOf(node) {
        if (node.operator !== "~") {
            return false;
        }
        const callNode = astUtils.skipChainExpression(node.argument);
        return (callNode.type === "CallExpression" &&
            astUtils.isSpecificMemberAccess(callNode.callee, null, INDEX_OF_PATTERN));
    }
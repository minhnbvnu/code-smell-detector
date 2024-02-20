function isVariadicApplyCalling(node) {
        return (astUtils.isSpecificMemberAccess(node.callee, null, "apply") &&
            node.arguments.length === 2 &&
            node.arguments[1].type !== "ArrayExpression" &&
            node.arguments[1].type !== "SpreadElement");
    }
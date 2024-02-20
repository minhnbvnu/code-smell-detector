function isCallOrNonVariadicApply(node) {
        const callee = astUtils.skipChainExpression(node.callee);
        return (callee.type === "MemberExpression" &&
            callee.property.type === "Identifier" &&
            callee.computed === false &&
            ((callee.property.name === "call" && node.arguments.length >= 1) ||
                (callee.property.name === "apply" && node.arguments.length === 2 && node.arguments[1].type === "ArrayExpression")));
    }
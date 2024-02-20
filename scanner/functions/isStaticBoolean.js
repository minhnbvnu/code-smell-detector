function isStaticBoolean(scope, node) {
        switch (node.type) {
            case "Literal":
                return typeof node.value === "boolean";
            case "CallExpression":
                return node.callee.type === "Identifier" && node.callee.name === "Boolean" &&
                    isReferenceToGlobalVariable(scope, node.callee) &&
                    (node.arguments.length === 0 || isConstant(scope, node.arguments[0], true));
            case "UnaryExpression":
                return node.operator === "!" && isConstant(scope, node.argument, true);
            default:
                return false;
        }
    }
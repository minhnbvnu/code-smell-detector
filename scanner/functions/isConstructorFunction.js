function isConstructorFunction(node) {
        return (node.type === "FunctionExpression" &&
            node.parent.type === "MethodDefinition" &&
            node.parent.kind === "constructor");
    }
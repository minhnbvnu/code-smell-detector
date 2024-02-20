function isClassConstructor(node) {
        return node.type === "FunctionExpression" &&
            node.parent &&
            node.parent.type === "MethodDefinition" &&
            node.parent.kind === "constructor";
    }
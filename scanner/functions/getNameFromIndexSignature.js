function getNameFromIndexSignature(node) {
        const propName = node.parameters.find((parameter) => parameter.type === utils_1.AST_NODE_TYPES.Identifier);
        return propName ? propName.name : '(index signature)';
    }
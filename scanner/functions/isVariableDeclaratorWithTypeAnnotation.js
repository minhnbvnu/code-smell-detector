function isVariableDeclaratorWithTypeAnnotation(node) {
        return (node.type === utils_1.AST_NODE_TYPES.VariableDeclarator && !!node.id.typeAnnotation);
    }
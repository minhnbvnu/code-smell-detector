function isPropertyDefinitionWithTypeAnnotation(node) {
        return (node.type === utils_1.AST_NODE_TYPES.PropertyDefinition && !!node.typeAnnotation);
    }
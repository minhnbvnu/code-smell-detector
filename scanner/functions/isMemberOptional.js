function isMemberOptional(node) {
        switch (node.type) {
            case utils_1.AST_NODE_TYPES.TSPropertySignature:
            case utils_1.AST_NODE_TYPES.TSMethodSignature:
            case utils_1.AST_NODE_TYPES.TSAbstractPropertyDefinition:
            case utils_1.AST_NODE_TYPES.PropertyDefinition:
            case utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition:
            case utils_1.AST_NODE_TYPES.MethodDefinition:
                return !!node.optional;
        }
        return false;
    }
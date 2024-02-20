function typeNeedsParentheses(node) {
        switch (node.type) {
            case utils_1.AST_NODE_TYPES.TSTypeReference:
                return typeNeedsParentheses(node.typeName);
            case utils_1.AST_NODE_TYPES.TSUnionType:
            case utils_1.AST_NODE_TYPES.TSFunctionType:
            case utils_1.AST_NODE_TYPES.TSIntersectionType:
            case utils_1.AST_NODE_TYPES.TSTypeOperator:
            case utils_1.AST_NODE_TYPES.TSInferType:
            case utils_1.AST_NODE_TYPES.TSConstructorType:
                return true;
            case utils_1.AST_NODE_TYPES.Identifier:
                return node.name === 'ReadonlyArray';
            default:
                return false;
        }
    }
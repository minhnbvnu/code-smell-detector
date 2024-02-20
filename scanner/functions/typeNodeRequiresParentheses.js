function typeNodeRequiresParentheses(node, text) {
        return (node.type === utils_1.AST_NODE_TYPES.TSFunctionType ||
            node.type === utils_1.AST_NODE_TYPES.TSConstructorType ||
            node.type === utils_1.AST_NODE_TYPES.TSConditionalType ||
            (node.type === utils_1.AST_NODE_TYPES.TSUnionType && text.startsWith('|')) ||
            (node.type === utils_1.AST_NODE_TYPES.TSIntersectionType && text.startsWith('&')));
    }
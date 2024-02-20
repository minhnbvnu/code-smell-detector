function isStrongPrecedenceNode(innerNode) {
        return (innerNode.type === utils_1.AST_NODE_TYPES.Literal ||
            innerNode.type === utils_1.AST_NODE_TYPES.Identifier ||
            innerNode.type === utils_1.AST_NODE_TYPES.ArrayExpression ||
            innerNode.type === utils_1.AST_NODE_TYPES.ObjectExpression ||
            innerNode.type === utils_1.AST_NODE_TYPES.MemberExpression ||
            innerNode.type === utils_1.AST_NODE_TYPES.CallExpression ||
            innerNode.type === utils_1.AST_NODE_TYPES.NewExpression ||
            innerNode.type === utils_1.AST_NODE_TYPES.TaggedTemplateExpression);
    }
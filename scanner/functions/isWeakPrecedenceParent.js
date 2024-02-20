function isWeakPrecedenceParent(node) {
        const parent = node.parent;
        if (parent.type === utils_1.AST_NODE_TYPES.UpdateExpression ||
            parent.type === utils_1.AST_NODE_TYPES.UnaryExpression ||
            parent.type === utils_1.AST_NODE_TYPES.BinaryExpression ||
            parent.type === utils_1.AST_NODE_TYPES.LogicalExpression ||
            parent.type === utils_1.AST_NODE_TYPES.ConditionalExpression ||
            parent.type === utils_1.AST_NODE_TYPES.AwaitExpression) {
            return true;
        }
        if (parent.type === utils_1.AST_NODE_TYPES.MemberExpression &&
            parent.object === node) {
            return true;
        }
        if ((parent.type === utils_1.AST_NODE_TYPES.CallExpression ||
            parent.type === utils_1.AST_NODE_TYPES.NewExpression) &&
            parent.callee === node) {
            return true;
        }
        if (parent.type === utils_1.AST_NODE_TYPES.TaggedTemplateExpression &&
            parent.tag === node) {
            return true;
        }
        return false;
    }
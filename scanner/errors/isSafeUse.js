function isSafeUse(node) {
        const parent = node.parent;
        switch (parent === null || parent === void 0 ? void 0 : parent.type) {
            case utils_1.AST_NODE_TYPES.IfStatement:
            case utils_1.AST_NODE_TYPES.ForStatement:
            case utils_1.AST_NODE_TYPES.MemberExpression:
            case utils_1.AST_NODE_TYPES.SwitchStatement:
            case utils_1.AST_NODE_TYPES.UpdateExpression:
            case utils_1.AST_NODE_TYPES.WhileStatement:
                return true;
            case utils_1.AST_NODE_TYPES.CallExpression:
                return parent.callee === node;
            case utils_1.AST_NODE_TYPES.ConditionalExpression:
                return parent.test === node;
            case utils_1.AST_NODE_TYPES.TaggedTemplateExpression:
                return parent.tag === node;
            case utils_1.AST_NODE_TYPES.UnaryExpression:
                // the first case is safe for obvious
                // reasons. The second one is also fine
                // since we're returning something falsy
                return ['typeof', '!', 'void', 'delete'].includes(parent.operator);
            case utils_1.AST_NODE_TYPES.BinaryExpression:
                return ['instanceof', '==', '!=', '===', '!=='].includes(parent.operator);
            case utils_1.AST_NODE_TYPES.AssignmentExpression:
                return (parent.operator === '=' &&
                    (node === parent.left ||
                        (node.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                            node.object.type === utils_1.AST_NODE_TYPES.Super &&
                            parent.left.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                            parent.left.object.type === utils_1.AST_NODE_TYPES.ThisExpression)));
            case utils_1.AST_NODE_TYPES.ChainExpression:
            case utils_1.AST_NODE_TYPES.TSNonNullExpression:
            case utils_1.AST_NODE_TYPES.TSAsExpression:
            case utils_1.AST_NODE_TYPES.TSTypeAssertion:
                return isSafeUse(parent);
            case utils_1.AST_NODE_TYPES.LogicalExpression:
                if (parent.operator === '&&' && parent.left === node) {
                    // this is safe, as && will return the left if and only if it's falsy
                    return true;
                }
                // in all other cases, it's likely the logical expression will return the method ref
                // so make sure the parent is a safe usage
                return isSafeUse(parent);
        }
        return false;
    }
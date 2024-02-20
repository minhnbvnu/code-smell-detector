function isConditionalTest(node) {
        const parents = new Set([node]);
        let current = node.parent;
        while (current) {
            parents.add(current);
            if ((current.type === utils_1.AST_NODE_TYPES.ConditionalExpression ||
                current.type === utils_1.AST_NODE_TYPES.DoWhileStatement ||
                current.type === utils_1.AST_NODE_TYPES.IfStatement ||
                current.type === utils_1.AST_NODE_TYPES.ForStatement ||
                current.type === utils_1.AST_NODE_TYPES.WhileStatement) &&
                parents.has(current.test)) {
                return true;
            }
            if ([
                utils_1.AST_NODE_TYPES.ArrowFunctionExpression,
                utils_1.AST_NODE_TYPES.FunctionExpression,
            ].includes(current.type)) {
                /**
                 * This is a weird situation like:
                 * `if (() => a || b) {}`
                 * `if (function () { return a || b }) {}`
                 */
                return false;
            }
            current = current.parent;
        }
        return false;
    }
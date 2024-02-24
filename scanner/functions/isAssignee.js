function isAssignee(node) {
                var _a;
                const parent = node.parent;
                if (!parent) {
                    return false;
                }
                // a[i] = 1, a[i] += 1, etc.
                if (parent.type === utils_1.AST_NODE_TYPES.AssignmentExpression &&
                    parent.left === node) {
                    return true;
                }
                // delete a[i]
                if (parent.type === utils_1.AST_NODE_TYPES.UnaryExpression &&
                    parent.operator === 'delete' &&
                    parent.argument === node) {
                    return true;
                }
                // a[i]++, --a[i], etc.
                if (parent.type === utils_1.AST_NODE_TYPES.UpdateExpression &&
                    parent.argument === node) {
                    return true;
                }
                // [a[i]] = [0]
                if (parent.type === utils_1.AST_NODE_TYPES.ArrayPattern) {
                    return true;
                }
                // [...a[i]] = [0]
                if (parent.type === utils_1.AST_NODE_TYPES.RestElement) {
                    return true;
                }
                // ({ foo: a[i] }) = { foo: 0 }
                if (parent.type === utils_1.AST_NODE_TYPES.Property &&
                    parent.value === node &&
                    ((_a = parent.parent) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.ObjectExpression &&
                    isAssignee(parent.parent)) {
                    return true;
                }
                return false;
            }
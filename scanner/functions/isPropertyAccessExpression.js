function isPropertyAccessExpression(node) {
                return node.type === utils_1.AST_NODE_TYPES.MemberExpression && !node.computed;
            }
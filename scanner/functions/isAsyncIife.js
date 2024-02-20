function isAsyncIife(node) {
                if (node.expression.type !== utils_1.AST_NODE_TYPES.CallExpression) {
                    return false;
                }
                return (node.expression.type === utils_1.AST_NODE_TYPES.CallExpression &&
                    (node.expression.callee.type ===
                        utils_1.AST_NODE_TYPES.ArrowFunctionExpression ||
                        node.expression.callee.type === utils_1.AST_NODE_TYPES.FunctionExpression));
            }
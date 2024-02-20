function isValidExpression(node) {
                if (allowShortCircuit && node.type === utils_1.AST_NODE_TYPES.LogicalExpression) {
                    return isValidExpression(node.right);
                }
                if (allowTernary && node.type === utils_1.AST_NODE_TYPES.ConditionalExpression) {
                    return (isValidExpression(node.alternate) &&
                        isValidExpression(node.consequent));
                }
                return ((node.type === utils_1.AST_NODE_TYPES.ChainExpression &&
                    node.expression.type === utils_1.AST_NODE_TYPES.CallExpression) ||
                    node.type === utils_1.AST_NODE_TYPES.ImportExpression);
            }
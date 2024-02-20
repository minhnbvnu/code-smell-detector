function isVariableDeclarationIgnoreFunction(node) {
                return (variableDeclarationIgnoreFunction === true &&
                    (node.type === utils_1.AST_NODE_TYPES.ArrowFunctionExpression ||
                        node.type === utils_1.AST_NODE_TYPES.FunctionExpression));
            }
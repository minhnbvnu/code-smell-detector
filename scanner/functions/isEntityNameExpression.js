function isEntityNameExpression(node) {
                return (node.type === utils_1.AST_NODE_TYPES.Identifier ||
                    (isPropertyAccessExpression(node) &&
                        isEntityNameExpression(node.object)));
            }
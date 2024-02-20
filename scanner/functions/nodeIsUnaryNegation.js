function nodeIsUnaryNegation(node) {
                return (node.type === utils_1.AST_NODE_TYPES.UnaryExpression &&
                    node.prefix &&
                    node.operator === '!');
            }
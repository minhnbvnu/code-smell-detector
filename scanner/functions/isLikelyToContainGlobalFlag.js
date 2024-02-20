function isLikelyToContainGlobalFlag(node) {
                if (node.type === utils_1.AST_NODE_TYPES.CallExpression ||
                    node.type === utils_1.AST_NODE_TYPES.NewExpression) {
                    const [, flags] = node.arguments;
                    return (flags &&
                        flags.type === utils_1.AST_NODE_TYPES.Literal &&
                        typeof flags.value === 'string' &&
                        flags.value.includes('g'));
                }
                return node.type === utils_1.AST_NODE_TYPES.Identifier;
            }
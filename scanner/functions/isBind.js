function isBind(node) {
                return node.type === utils_1.AST_NODE_TYPES.MemberExpression
                    ? isBind(node.property)
                    : node.type === utils_1.AST_NODE_TYPES.Identifier && node.name === 'bind';
            }
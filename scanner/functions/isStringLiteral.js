function isStringLiteral(node) {
                return (node.type === utils_1.AST_NODE_TYPES.Literal && typeof node.value === 'string');
            }
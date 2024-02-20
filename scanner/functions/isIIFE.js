function isIIFE(node) {
                return node.parent.type === utils_1.AST_NODE_TYPES.CallExpression;
            }
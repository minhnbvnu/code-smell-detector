function getThisExpression(node) {
        while (node) {
            if (node.type === utils_1.AST_NODE_TYPES.CallExpression) {
                node = node.callee;
            }
            else if (node.type === utils_1.AST_NODE_TYPES.ThisExpression) {
                return node;
            }
            else if (node.type === utils_1.AST_NODE_TYPES.MemberExpression) {
                node = node.object;
            }
            else if (node.type === utils_1.AST_NODE_TYPES.ChainExpression) {
                node = node.expression;
            }
            else {
                break;
            }
        }
        return;
    }
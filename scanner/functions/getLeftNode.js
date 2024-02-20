function getLeftNode(node) {
                if (node.type === utils_1.AST_NODE_TYPES.ChainExpression) {
                    return getLeftNode(node.expression);
                }
                let leftNode;
                if (node.type === utils_1.AST_NODE_TYPES.CallExpression) {
                    leftNode = node.callee;
                }
                else {
                    leftNode = node;
                }
                if (leftNode.type !== utils_1.AST_NODE_TYPES.MemberExpression) {
                    throw new Error(`Expected a MemberExpression, got ${leftNode.type}`);
                }
                return leftNode;
            }
function getContainingLoopNode(node) {
        for (let currentNode = node; currentNode.parent; currentNode = currentNode.parent) {
            const parent = currentNode.parent;
            switch (parent.type) {
                case utils_1.AST_NODE_TYPES.WhileStatement:
                case utils_1.AST_NODE_TYPES.DoWhileStatement:
                    return parent;
                case utils_1.AST_NODE_TYPES.ForStatement:
                    // `init` is outside of the loop.
                    if (parent.init !== currentNode) {
                        return parent;
                    }
                    break;
                case utils_1.AST_NODE_TYPES.ForInStatement:
                case utils_1.AST_NODE_TYPES.ForOfStatement:
                    // `right` is outside of the loop.
                    if (parent.right !== currentNode) {
                        return parent;
                    }
                    break;
                case utils_1.AST_NODE_TYPES.ArrowFunctionExpression:
                case utils_1.AST_NODE_TYPES.FunctionExpression:
                case utils_1.AST_NODE_TYPES.FunctionDeclaration:
                    // We don't need to check nested functions.
                    return null;
                default:
                    break;
            }
        }
        return null;
    }
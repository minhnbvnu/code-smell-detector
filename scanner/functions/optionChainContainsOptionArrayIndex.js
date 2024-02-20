function optionChainContainsOptionArrayIndex(node) {
                const lhsNode = node.type === utils_1.AST_NODE_TYPES.CallExpression ? node.callee : node.object;
                if (node.optional && isArrayIndexExpression(lhsNode)) {
                    return true;
                }
                if (lhsNode.type === utils_1.AST_NODE_TYPES.MemberExpression ||
                    lhsNode.type === utils_1.AST_NODE_TYPES.CallExpression) {
                    return optionChainContainsOptionArrayIndex(lhsNode);
                }
                return false;
            }
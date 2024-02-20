function flattenCommaElements(node) {
                if (nodeIsSynthesized(node) && !isParseTreeNode(node) && !node.original && !node.emitNode && !node.id) {
                    if (isCommaListExpression(node)) {
                        return node.elements;
                    }
                    if (isBinaryExpression(node) && isCommaToken(node.operatorToken)) {
                        return [node.left, node.right];
                    }
                }
                return node;
            }
function getValidParentNodeOfEmptySpan(node) {
            while (node.parent) {
                if (isValidExpressionOrStatement(node) && !isValidExpressionOrStatement(node.parent)) {
                    return node;
                }
                node = node.parent;
            }
            return void 0;
        }
function getRightMostAssignedExpression(node) {
            while (isAssignmentExpression(node, 
            /*excludeCompoundAssignments*/
            true)) {
                node = node.right;
            }
            return node;
        }
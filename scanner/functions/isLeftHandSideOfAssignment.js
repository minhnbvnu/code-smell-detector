function isLeftHandSideOfAssignment(node) {
            return isAssignmentExpression(node.parent) && node.parent.left === node;
        }
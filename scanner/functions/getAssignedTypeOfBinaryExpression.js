function getAssignedTypeOfBinaryExpression(node) {
                const isDestructuringDefaultAssignment = node.parent.kind === 206 /* ArrayLiteralExpression */ && isDestructuringAssignmentTarget(node.parent) || node.parent.kind === 299 /* PropertyAssignment */ && isDestructuringAssignmentTarget(node.parent.parent);
                return isDestructuringDefaultAssignment ? getTypeWithDefault(getAssignedType(node), node.right) : getTypeOfExpression(node.right);
            }
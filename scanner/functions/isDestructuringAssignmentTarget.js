function isDestructuringAssignmentTarget(parent2) {
                return parent2.parent.kind === 223 /* BinaryExpression */ && parent2.parent.left === parent2 || parent2.parent.kind === 247 /* ForOfStatement */ && parent2.parent.initializer === parent2;
            }
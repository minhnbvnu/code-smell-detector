function containsAssignment(node) {
                if (node.type === "AssignmentExpression") {
                    return true;
                }
                if (node.type === "ConditionalExpression" &&
                    (node.consequent.type === "AssignmentExpression" || node.alternate.type === "AssignmentExpression")) {
                    return true;
                }
                if ((node.left && node.left.type === "AssignmentExpression") ||
                    (node.right && node.right.type === "AssignmentExpression")) {
                    return true;
                }
                return false;
            }
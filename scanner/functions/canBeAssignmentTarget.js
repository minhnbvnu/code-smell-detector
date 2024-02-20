function canBeAssignmentTarget(node) {
                return node && (node.type === "Identifier" || node.type === "MemberExpression");
            }
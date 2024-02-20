function isCondAssignException(node) {
                return EXCEPT_COND_ASSIGN && node.test.type === "AssignmentExpression";
            }
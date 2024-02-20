function isWriteOnlyAssignment(privateIdentifierNode) {
                const parentStatement = privateIdentifierNode.parent.parent;
                const isAssignmentExpression = parentStatement.type === "AssignmentExpression";
                if (!isAssignmentExpression &&
                    parentStatement.type !== "ForInStatement" &&
                    parentStatement.type !== "ForOfStatement" &&
                    parentStatement.type !== "AssignmentPattern") {
                    return false;
                }
                // It is a write-only usage, since we still allow usages on the right for reads
                if (parentStatement.left !== privateIdentifierNode.parent) {
                    return false;
                }
                // For any other operator (such as '+=') we still consider it a read operation
                if (isAssignmentExpression && parentStatement.operator !== "=") {
                    /*
                     * However, if the read operation is "discarded" in an empty statement, then
                     * we consider it write only.
                     */
                    return parentStatement.parent.type === "ExpressionStatement";
                }
                return true;
            }
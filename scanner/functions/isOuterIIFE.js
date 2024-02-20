function isOuterIIFE(node) {
                const parent = node.parent;
                let stmt = parent.parent;
                /*
                 * Verify that the node is an IIEF
                 */
                if (parent.type !== "CallExpression" ||
                    parent.callee !== node) {
                    return false;
                }
                /*
                 * Navigate legal ancestors to determine whether this IIEF is outer
                 */
                while (stmt.type === "UnaryExpression" && (stmt.operator === "!" ||
                    stmt.operator === "~" ||
                    stmt.operator === "+" ||
                    stmt.operator === "-") ||
                    stmt.type === "AssignmentExpression" ||
                    stmt.type === "LogicalExpression" ||
                    stmt.type === "SequenceExpression" ||
                    stmt.type === "VariableDeclarator") {
                    stmt = stmt.parent;
                }
                return ((stmt.type === "ExpressionStatement" ||
                    stmt.type === "VariableDeclaration") &&
                    stmt.parent && stmt.parent.type === "Program");
            }
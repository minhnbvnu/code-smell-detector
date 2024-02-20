function checkIfWithElse(node) {
                const parent = node.parent;
                /*
                 * Fixing this would require splitting one statement into two, so no error should
                 * be reported if this node is in a position where only one statement is allowed.
                 */
                if (!astUtils.STATEMENT_LIST_PARENTS.has(parent.type)) {
                    return;
                }
                const alternate = node.alternate;
                if (alternate && alwaysReturns(node.consequent)) {
                    displayReport(alternate);
                }
            }
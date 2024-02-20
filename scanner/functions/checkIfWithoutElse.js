function checkIfWithoutElse(node) {
                const parent = node.parent;
                /*
                 * Fixing this would require splitting one statement into two, so no error should
                 * be reported if this node is in a position where only one statement is allowed.
                 */
                if (!astUtils.STATEMENT_LIST_PARENTS.has(parent.type)) {
                    return;
                }
                const consequents = [];
                let alternate;
                for (let currentNode = node; currentNode.type === "IfStatement"; currentNode = currentNode.alternate) {
                    if (!currentNode.alternate) {
                        return;
                    }
                    consequents.push(currentNode.consequent);
                    alternate = currentNode.alternate;
                }
                if (consequents.every(alwaysReturns)) {
                    displayReport(alternate);
                }
            }
function prepareIfChecks(node) {
                const preparedChecks = [];
                for (let currentNode = node; currentNode; currentNode = currentNode.alternate) {
                    preparedChecks.push(prepareCheck(currentNode, currentNode.consequent, "if", { condition: true }));
                    if (currentNode.alternate && currentNode.alternate.type !== "IfStatement") {
                        preparedChecks.push(prepareCheck(currentNode, currentNode.alternate, "else"));
                        break;
                    }
                }
                if (consistent) {
                    /*
                     * If any node should have or already have braces, make sure they
                     * all have braces.
                     * If all nodes shouldn't have braces, make sure they don't.
                     */
                    const expected = preparedChecks.some(preparedCheck => {
                        if (preparedCheck.expected !== null) {
                            return preparedCheck.expected;
                        }
                        return preparedCheck.actual;
                    });
                    preparedChecks.forEach(preparedCheck => {
                        preparedCheck.expected = expected;
                    });
                }
                return preparedChecks;
            }
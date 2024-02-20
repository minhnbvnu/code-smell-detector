function buildStatements() {
                if (operations) {
                    for (let operationIndex = 0; operationIndex < operations.length; operationIndex++) {
                        writeOperation(operationIndex);
                    }
                    flushFinalLabel(operations.length);
                }
                else {
                    flushFinalLabel(0);
                }
                if (clauses) {
                    const labelExpression = factory2.createPropertyAccessExpression(state, "label");
                    const switchStatement = factory2.createSwitchStatement(labelExpression, factory2.createCaseBlock(clauses));
                    return [startOnNewLine(switchStatement)];
                }
                if (statements) {
                    return statements;
                }
                return [];
            }
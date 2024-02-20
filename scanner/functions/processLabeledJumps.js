function processLabeledJumps(table, isBreak, loopResultName, outerLoop, caseClauses) {
                if (!table) {
                    return;
                }
                table.forEach((labelMarker, labelText) => {
                    const statements = [];
                    if (!outerLoop || outerLoop.labels && outerLoop.labels.get(labelText)) {
                        const label = factory2.createIdentifier(labelText);
                        statements.push(isBreak ? factory2.createBreakStatement(label) : factory2.createContinueStatement(label));
                    }
                    else {
                        setLabeledJump(outerLoop, isBreak, labelText, labelMarker);
                        statements.push(factory2.createReturnStatement(loopResultName));
                    }
                    caseClauses.push(factory2.createCaseClause(factory2.createStringLiteral(labelMarker), statements));
                });
            }
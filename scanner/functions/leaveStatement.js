function leaveStatement(node) {
                const line = getActualLastToken(node).loc.end.line;
                // Update state.
                if (line !== lastStatementLine) {
                    reportFirstExtraStatementAndClear();
                    numberOfStatementsOnThisLine = 1;
                    lastStatementLine = line;
                }
            }
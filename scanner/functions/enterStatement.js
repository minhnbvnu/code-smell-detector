function enterStatement(node) {
                const line = node.loc.start.line;
                /*
                 * Skip to allow non-block statements if this is direct child of control statements.
                 * `if (a) foo();` is counted as 1.
                 * But `if (a) foo(); else foo();` should be counted as 2.
                 */
                if (SINGLE_CHILD_ALLOWED.test(node.parent.type) &&
                    node.parent.alternate !== node) {
                    return;
                }
                // Update state.
                if (line === lastStatementLine) {
                    numberOfStatementsOnThisLine += 1;
                }
                else {
                    reportFirstExtraStatementAndClear();
                    numberOfStatementsOnThisLine = 1;
                    lastStatementLine = line;
                }
                // Reports if the node violated this rule.
                if (numberOfStatementsOnThisLine === maxStatementsPerLine + 1) {
                    firstExtraStatement = firstExtraStatement || node;
                }
            }
function reportFirstExtraStatementAndClear() {
                if (firstExtraStatement) {
                    context.report({
                        node: firstExtraStatement,
                        messageId: "exceed",
                        data: {
                            numberOfStatementsOnThisLine,
                            maxStatementsPerLine,
                            statements: numberOfStatementsOnThisLine === 1 ? "statement" : "statements"
                        }
                    });
                }
                firstExtraStatement = null;
            }
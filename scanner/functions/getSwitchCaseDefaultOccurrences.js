function getSwitchCaseDefaultOccurrences(switchStatement) {
                        const keywords = [];
                        pushKeywordIf(keywords, switchStatement.getFirstToken(), 107 /* SwitchKeyword */);
                        forEach(switchStatement.caseBlock.clauses, (clause) => {
                            pushKeywordIf(keywords, clause.getFirstToken(), 82 /* CaseKeyword */, 88 /* DefaultKeyword */);
                            forEach(aggregateAllBreakAndContinueStatements(clause), (statement) => {
                                if (ownsBreakOrContinueStatement(switchStatement, statement)) {
                                    pushKeywordIf(keywords, statement.getFirstToken(), 81 /* BreakKeyword */);
                                }
                            });
                        });
                        return keywords;
                    }
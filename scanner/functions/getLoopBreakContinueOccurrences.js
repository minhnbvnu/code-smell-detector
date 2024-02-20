function getLoopBreakContinueOccurrences(loopNode) {
                        const keywords = [];
                        if (pushKeywordIf(keywords, loopNode.getFirstToken(), 97 /* ForKeyword */, 115 /* WhileKeyword */, 90 /* DoKeyword */)) {
                            if (loopNode.kind === 243 /* DoStatement */) {
                                const loopTokens = loopNode.getChildren();
                                for (let i = loopTokens.length - 1; i >= 0; i--) {
                                    if (pushKeywordIf(keywords, loopTokens[i], 115 /* WhileKeyword */)) {
                                        break;
                                    }
                                }
                            }
                        }
                        forEach(aggregateAllBreakAndContinueStatements(loopNode.statement), (statement) => {
                            if (ownsBreakOrContinueStatement(loopNode, statement)) {
                                pushKeywordIf(keywords, statement.getFirstToken(), 81 /* BreakKeyword */, 86 /* ContinueKeyword */);
                            }
                        });
                        return keywords;
                    }
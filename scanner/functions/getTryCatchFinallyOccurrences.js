function getTryCatchFinallyOccurrences(tryStatement, sourceFile) {
                        const keywords = [];
                        pushKeywordIf(keywords, tryStatement.getFirstToken(), 111 /* TryKeyword */);
                        if (tryStatement.catchClause) {
                            pushKeywordIf(keywords, tryStatement.catchClause.getFirstToken(), 83 /* CatchKeyword */);
                        }
                        if (tryStatement.finallyBlock) {
                            const finallyKeyword = findChildOfKind(tryStatement, 96 /* FinallyKeyword */, sourceFile);
                            pushKeywordIf(keywords, finallyKeyword, 96 /* FinallyKeyword */);
                        }
                        return keywords;
                    }
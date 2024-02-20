function getReturnOccurrences(returnStatement, sourceFile) {
                        const func = getContainingFunction(returnStatement);
                        if (!func) {
                            return void 0;
                        }
                        const keywords = [];
                        forEachReturnStatement(cast(func.body, isBlock), (returnStatement2) => {
                            keywords.push(findChildOfKind(returnStatement2, 105 /* ReturnKeyword */, sourceFile));
                        });
                        forEach(aggregateOwnedThrowStatements(func.body), (throwStatement) => {
                            keywords.push(findChildOfKind(throwStatement, 109 /* ThrowKeyword */, sourceFile));
                        });
                        return keywords;
                    }
function getThrowOccurrences(throwStatement, sourceFile) {
                        const owner = getThrowStatementOwner(throwStatement);
                        if (!owner) {
                            return void 0;
                        }
                        const keywords = [];
                        forEach(aggregateOwnedThrowStatements(owner), (throwStatement2) => {
                            keywords.push(findChildOfKind(throwStatement2, 109 /* ThrowKeyword */, sourceFile));
                        });
                        if (isFunctionBlock(owner)) {
                            forEachReturnStatement(owner, (returnStatement) => {
                                keywords.push(findChildOfKind(returnStatement, 105 /* ReturnKeyword */, sourceFile));
                            });
                        }
                        return keywords;
                    }
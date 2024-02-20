function parseCaseClause() {
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        parseExpected(82 /* CaseKeyword */);
                        const expression = allowInAnd(parseExpression);
                        parseExpected(58 /* ColonToken */);
                        const statements = parseList(3 /* SwitchClauseStatements */, parseStatement);
                        return withJSDoc(finishNode(factory2.createCaseClause(expression, statements), pos), hasJSDoc);
                    }
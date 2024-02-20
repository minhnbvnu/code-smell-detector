function parseDefaultClause() {
                        const pos = getNodePos();
                        parseExpected(88 /* DefaultKeyword */);
                        parseExpected(58 /* ColonToken */);
                        const statements = parseList(3 /* SwitchClauseStatements */, parseStatement);
                        return finishNode(factory2.createDefaultClause(statements), pos);
                    }
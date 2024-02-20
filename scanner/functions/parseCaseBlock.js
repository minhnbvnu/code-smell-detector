function parseCaseBlock() {
                        const pos = getNodePos();
                        parseExpected(18 /* OpenBraceToken */);
                        const clauses = parseList(2 /* SwitchClauses */, parseCaseOrDefaultClause);
                        parseExpected(19 /* CloseBraceToken */);
                        return finishNode(factory2.createCaseBlock(clauses), pos);
                    }
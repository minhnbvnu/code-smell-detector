function parseModuleBlock() {
                        const pos = getNodePos();
                        let statements;
                        if (parseExpected(18 /* OpenBraceToken */)) {
                            statements = parseList(1 /* BlockStatements */, parseStatement);
                            parseExpected(19 /* CloseBraceToken */);
                        }
                        else {
                            statements = createMissingList();
                        }
                        return finishNode(factory2.createModuleBlock(statements), pos);
                    }
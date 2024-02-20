function parseDebuggerStatement() {
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        parseExpected(87 /* DebuggerKeyword */);
                        parseSemicolon();
                        return withJSDoc(finishNode(factory2.createDebuggerStatement(), pos), hasJSDoc);
                    }
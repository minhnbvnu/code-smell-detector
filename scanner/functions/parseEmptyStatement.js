function parseEmptyStatement() {
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        parseExpected(26 /* SemicolonToken */);
                        return withJSDoc(finishNode(factory2.createEmptyStatement(), pos), hasJSDoc);
                    }
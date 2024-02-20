function parseTryStatement() {
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        parseExpected(111 /* TryKeyword */);
                        const tryBlock = parseBlock(
                        /*ignoreMissingOpenBrace*/
                        false);
                        const catchClause = token() === 83 /* CatchKeyword */ ? parseCatchClause() : void 0;
                        let finallyBlock;
                        if (!catchClause || token() === 96 /* FinallyKeyword */) {
                            parseExpected(96 /* FinallyKeyword */, Diagnostics.catch_or_finally_expected);
                            finallyBlock = parseBlock(
                            /*ignoreMissingOpenBrace*/
                            false);
                        }
                        return withJSDoc(finishNode(factory2.createTryStatement(tryBlock, catchClause, finallyBlock), pos), hasJSDoc);
                    }
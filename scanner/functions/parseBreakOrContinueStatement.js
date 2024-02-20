function parseBreakOrContinueStatement(kind) {
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        parseExpected(kind === 249 /* BreakStatement */ ? 81 /* BreakKeyword */ : 86 /* ContinueKeyword */);
                        const label = canParseSemicolon() ? void 0 : parseIdentifier();
                        parseSemicolon();
                        const node = kind === 249 /* BreakStatement */ ? factory2.createBreakStatement(label) : factory2.createContinueStatement(label);
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }
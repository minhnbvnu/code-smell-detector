function parseJsxExpression(inExpressionContext) {
                        const pos = getNodePos();
                        if (!parseExpected(18 /* OpenBraceToken */)) {
                            return void 0;
                        }
                        let dotDotDotToken;
                        let expression;
                        if (token() !== 19 /* CloseBraceToken */) {
                            dotDotDotToken = parseOptionalToken(25 /* DotDotDotToken */);
                            expression = parseExpression();
                        }
                        if (inExpressionContext) {
                            parseExpected(19 /* CloseBraceToken */);
                        }
                        else {
                            if (parseExpected(19 /* CloseBraceToken */, 
                            /*message*/
                            void 0, 
                            /*shouldAdvance*/
                            false)) {
                                scanJsxText();
                            }
                        }
                        return finishNode(factory2.createJsxExpression(dotDotDotToken, expression), pos);
                    }
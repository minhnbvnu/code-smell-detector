function parseJsxSpreadAttribute() {
                        const pos = getNodePos();
                        parseExpected(18 /* OpenBraceToken */);
                        parseExpected(25 /* DotDotDotToken */);
                        const expression = parseExpression();
                        parseExpected(19 /* CloseBraceToken */);
                        return finishNode(factory2.createJsxSpreadAttribute(expression), pos);
                    }
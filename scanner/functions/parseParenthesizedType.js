function parseParenthesizedType() {
                        const pos = getNodePos();
                        parseExpected(20 /* OpenParenToken */);
                        const type = parseType();
                        parseExpected(21 /* CloseParenToken */);
                        return finishNode(factory2.createParenthesizedType(type), pos);
                    }
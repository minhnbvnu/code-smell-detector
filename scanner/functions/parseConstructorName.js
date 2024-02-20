function parseConstructorName() {
                        if (token() === 135 /* ConstructorKeyword */) {
                            return parseExpected(135 /* ConstructorKeyword */);
                        }
                        if (token() === 10 /* StringLiteral */ && lookAhead(nextToken) === 20 /* OpenParenToken */) {
                            return tryParse(() => {
                                const literalNode = parseLiteralNode();
                                return literalNode.text === "constructor" ? literalNode : void 0;
                            });
                        }
                    }
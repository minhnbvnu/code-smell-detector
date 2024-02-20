function isAssertionKey2() {
                        return tokenIsIdentifierOrKeyword(token()) || token() === 10 /* StringLiteral */;
                    }
function parseAssertEntry() {
                        const pos = getNodePos();
                        const name = tokenIsIdentifierOrKeyword(token()) ? parseIdentifierName() : parseLiteralLikeNode(10 /* StringLiteral */);
                        parseExpected(58 /* ColonToken */);
                        const value = parseAssignmentExpressionOrHigher(
                        /*allowReturnTypeInArrowFunction*/
                        true);
                        return finishNode(factory2.createAssertEntry(name, value), pos);
                    }
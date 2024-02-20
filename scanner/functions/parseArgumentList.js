function parseArgumentList() {
                        parseExpected(20 /* OpenParenToken */);
                        const result = parseDelimitedList(11 /* ArgumentExpressions */, parseArgumentExpression);
                        parseExpected(21 /* CloseParenToken */);
                        return result;
                    }
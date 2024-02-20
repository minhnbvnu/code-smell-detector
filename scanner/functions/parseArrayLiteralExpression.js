function parseArrayLiteralExpression() {
                        const pos = getNodePos();
                        const openBracketPosition = scanner2.getTokenPos();
                        const openBracketParsed = parseExpected(22 /* OpenBracketToken */);
                        const multiLine = scanner2.hasPrecedingLineBreak();
                        const elements = parseDelimitedList(15 /* ArrayLiteralMembers */, parseArgumentOrArrayLiteralElement);
                        parseExpectedMatchingBrackets(22 /* OpenBracketToken */, 23 /* CloseBracketToken */, openBracketParsed, openBracketPosition);
                        return finishNode(factoryCreateArrayLiteralExpression(elements, multiLine), pos);
                    }
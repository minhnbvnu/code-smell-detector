function parseObjectLiteralExpression() {
                        const pos = getNodePos();
                        const openBracePosition = scanner2.getTokenPos();
                        const openBraceParsed = parseExpected(18 /* OpenBraceToken */);
                        const multiLine = scanner2.hasPrecedingLineBreak();
                        const properties = parseDelimitedList(12 /* ObjectLiteralMembers */, parseObjectLiteralElement, 
                        /*considerSemicolonAsDelimiter*/
                        true);
                        parseExpectedMatchingBrackets(18 /* OpenBraceToken */, 19 /* CloseBraceToken */, openBraceParsed, openBracePosition);
                        return finishNode(factoryCreateObjectLiteralExpression(properties, multiLine), pos);
                    }
function parseArrayBindingPattern() {
                        const pos = getNodePos();
                        parseExpected(22 /* OpenBracketToken */);
                        const elements = parseDelimitedList(10 /* ArrayBindingElements */, parseArrayBindingElement);
                        parseExpected(23 /* CloseBracketToken */);
                        return finishNode(factory2.createArrayBindingPattern(elements), pos);
                    }
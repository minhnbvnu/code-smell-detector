function parseObjectBindingPattern() {
                        const pos = getNodePos();
                        parseExpected(18 /* OpenBraceToken */);
                        const elements = parseDelimitedList(9 /* ObjectBindingElements */, parseObjectBindingElement);
                        parseExpected(19 /* CloseBraceToken */);
                        return finishNode(factory2.createObjectBindingPattern(elements), pos);
                    }
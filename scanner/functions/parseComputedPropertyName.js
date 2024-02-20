function parseComputedPropertyName() {
                        const pos = getNodePos();
                        parseExpected(22 /* OpenBracketToken */);
                        const expression = allowInAnd(parseExpression);
                        parseExpected(23 /* CloseBracketToken */);
                        return finishNode(factory2.createComputedPropertyName(expression), pos);
                    }
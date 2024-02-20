function parseTypeAssertion() {
                        Debug.assert(languageVariant !== 1 /* JSX */, "Type assertions should never be parsed in JSX; they should be parsed as comparisons or JSX elements/fragments.");
                        const pos = getNodePos();
                        parseExpected(29 /* LessThanToken */);
                        const type = parseType();
                        parseExpected(31 /* GreaterThanToken */);
                        const expression = parseSimpleUnaryExpression();
                        return finishNode(factory2.createTypeAssertion(type, expression), pos);
                    }
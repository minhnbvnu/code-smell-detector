function parseAssertsTypePredicate() {
                        const pos = getNodePos();
                        const assertsModifier = parseExpectedToken(129 /* AssertsKeyword */);
                        const parameterName = token() === 108 /* ThisKeyword */ ? parseThisTypeNode() : parseIdentifier();
                        const type = parseOptional(140 /* IsKeyword */) ? parseType() : void 0;
                        return finishNode(factory2.createTypePredicateNode(assertsModifier, parameterName, type), pos);
                    }
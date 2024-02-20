function parseTupleElementNameOrTupleElementType() {
                        if (lookAhead(isTupleElementName)) {
                            const pos = getNodePos();
                            const hasJSDoc = hasPrecedingJSDocComment();
                            const dotDotDotToken = parseOptionalToken(25 /* DotDotDotToken */);
                            const name = parseIdentifierName();
                            const questionToken = parseOptionalToken(57 /* QuestionToken */);
                            parseExpected(58 /* ColonToken */);
                            const type = parseTupleElementType();
                            const node = factory2.createNamedTupleMember(dotDotDotToken, name, questionToken, type);
                            return withJSDoc(finishNode(node, pos), hasJSDoc);
                        }
                        return parseTupleElementType();
                    }
function parseJSDocIdentifierName(message) {
                                if (!tokenIsIdentifierOrKeyword(token())) {
                                    return createMissingNode(79 /* Identifier */, 
                                    /*reportAtCurrentPosition*/
                                    !message, message || Diagnostics.Identifier_expected);
                                }
                                identifierCount++;
                                const pos = scanner2.getTokenPos();
                                const end2 = scanner2.getTextPos();
                                const originalKeywordKind = token();
                                const text = internIdentifier(scanner2.getTokenValue());
                                const result = finishNode(factoryCreateIdentifier(text, originalKeywordKind), pos, end2);
                                nextTokenJSDoc();
                                return result;
                            }
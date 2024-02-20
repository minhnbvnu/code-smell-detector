function parsePostfixTypeOrHigher() {
                        const pos = getNodePos();
                        let type = parseNonArrayType();
                        while (!scanner2.hasPrecedingLineBreak()) {
                            switch (token()) {
                                case 53 /* ExclamationToken */:
                                    nextToken();
                                    type = finishNode(factory2.createJSDocNonNullableType(type, 
                                    /*postfix*/
                                    true), pos);
                                    break;
                                case 57 /* QuestionToken */:
                                    if (lookAhead(nextTokenIsStartOfType)) {
                                        return type;
                                    }
                                    nextToken();
                                    type = finishNode(factory2.createJSDocNullableType(type, 
                                    /*postfix*/
                                    true), pos);
                                    break;
                                case 22 /* OpenBracketToken */:
                                    parseExpected(22 /* OpenBracketToken */);
                                    if (isStartOfType()) {
                                        const indexType = parseType();
                                        parseExpected(23 /* CloseBracketToken */);
                                        type = finishNode(factory2.createIndexedAccessTypeNode(type, indexType), pos);
                                    }
                                    else {
                                        parseExpected(23 /* CloseBracketToken */);
                                        type = finishNode(factory2.createArrayTypeNode(type), pos);
                                    }
                                    break;
                                default:
                                    return type;
                            }
                        }
                        return type;
                    }
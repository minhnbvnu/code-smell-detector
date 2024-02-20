function parseSimpleUnaryExpression() {
                        switch (token()) {
                            case 39 /* PlusToken */:
                            case 40 /* MinusToken */:
                            case 54 /* TildeToken */:
                            case 53 /* ExclamationToken */:
                                return parsePrefixUnaryExpression();
                            case 89 /* DeleteKeyword */:
                                return parseDeleteExpression();
                            case 112 /* TypeOfKeyword */:
                                return parseTypeOfExpression();
                            case 114 /* VoidKeyword */:
                                return parseVoidExpression();
                            case 29 /* LessThanToken */:
                                if (languageVariant === 1 /* JSX */) {
                                    return parseJsxElementOrSelfClosingElementOrFragment(
                                    /*inExpressionContext*/
                                    true, 
                                    /*topInvalidNodePosition*/
                                    void 0, 
                                    /*openingTag*/
                                    void 0, 
                                    /*mustBeUnary*/
                                    true);
                                }
                                return parseTypeAssertion();
                            case 133 /* AwaitKeyword */:
                                if (isAwaitExpression2()) {
                                    return parseAwaitExpression();
                                }
                            default:
                                return parseUpdateExpression();
                        }
                    }
function parseBracketNameInPropertyAndParamTag() {
                                const isBracketed = parseOptionalJsdoc(22 /* OpenBracketToken */);
                                if (isBracketed) {
                                    skipWhitespace();
                                }
                                const isBackquoted = parseOptionalJsdoc(61 /* BacktickToken */);
                                const name = parseJSDocEntityName();
                                if (isBackquoted) {
                                    parseExpectedTokenJSDoc(61 /* BacktickToken */);
                                }
                                if (isBracketed) {
                                    skipWhitespace();
                                    if (parseOptionalToken(63 /* EqualsToken */)) {
                                        parseExpression();
                                    }
                                    parseExpected(23 /* CloseBracketToken */);
                                }
                                return { name, isBracketed };
                            }
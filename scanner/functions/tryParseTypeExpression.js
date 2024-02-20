function tryParseTypeExpression() {
                                skipWhitespaceOrAsterisk();
                                return token() === 18 /* OpenBraceToken */ ? parseJSDocTypeExpression() : void 0;
                            }
function parseRightSideOfDot(allowIdentifierNames, allowPrivateIdentifiers) {
                        if (scanner2.hasPrecedingLineBreak() && tokenIsIdentifierOrKeyword(token())) {
                            const matchesPattern = lookAhead(nextTokenIsIdentifierOrKeywordOnSameLine);
                            if (matchesPattern) {
                                return createMissingNode(79 /* Identifier */, 
                                /*reportAtCurrentPosition*/
                                true, Diagnostics.Identifier_expected);
                            }
                        }
                        if (token() === 80 /* PrivateIdentifier */) {
                            const node = parsePrivateIdentifier();
                            return allowPrivateIdentifiers ? node : createMissingNode(79 /* Identifier */, 
                            /*reportAtCurrentPosition*/
                            true, Diagnostics.Identifier_expected);
                        }
                        return allowIdentifierNames ? parseIdentifierName() : parseIdentifier();
                    }
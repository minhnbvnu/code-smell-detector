function parseExpectedMatchingBrackets(openKind, closeKind, openParsed, openPosition) {
                        if (token() === closeKind) {
                            nextToken();
                            return;
                        }
                        const lastError = parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(closeKind));
                        if (!openParsed) {
                            return;
                        }
                        if (lastError) {
                            addRelatedInfo(lastError, createDetachedDiagnostic(fileName, openPosition, 1, Diagnostics.The_parser_expected_to_find_a_1_to_match_the_0_token_here, tokenToString(openKind), tokenToString(closeKind)));
                        }
                    }
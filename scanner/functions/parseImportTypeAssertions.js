function parseImportTypeAssertions() {
                        const pos = getNodePos();
                        const openBracePosition = scanner2.getTokenPos();
                        parseExpected(18 /* OpenBraceToken */);
                        const multiLine = scanner2.hasPrecedingLineBreak();
                        parseExpected(130 /* AssertKeyword */);
                        parseExpected(58 /* ColonToken */);
                        const clause = parseAssertClause(
                        /*skipAssertKeyword*/
                        true);
                        if (!parseExpected(19 /* CloseBraceToken */)) {
                            const lastError = lastOrUndefined(parseDiagnostics);
                            if (lastError && lastError.code === Diagnostics._0_expected.code) {
                                addRelatedInfo(lastError, createDetachedDiagnostic(fileName, openBracePosition, 1, Diagnostics.The_parser_expected_to_find_a_1_to_match_the_0_token_here, "{", "}"));
                            }
                        }
                        return finishNode(factory2.createImportTypeAssertionContainer(clause, multiLine), pos);
                    }
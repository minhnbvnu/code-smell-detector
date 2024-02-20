function parseAssertClause(skipAssertKeyword) {
                        const pos = getNodePos();
                        if (!skipAssertKeyword) {
                            parseExpected(130 /* AssertKeyword */);
                        }
                        const openBracePosition = scanner2.getTokenPos();
                        if (parseExpected(18 /* OpenBraceToken */)) {
                            const multiLine = scanner2.hasPrecedingLineBreak();
                            const elements = parseDelimitedList(24 /* AssertEntries */, parseAssertEntry, 
                            /*considerSemicolonAsDelimiter*/
                            true);
                            if (!parseExpected(19 /* CloseBraceToken */)) {
                                const lastError = lastOrUndefined(parseDiagnostics);
                                if (lastError && lastError.code === Diagnostics._0_expected.code) {
                                    addRelatedInfo(lastError, createDetachedDiagnostic(fileName, openBracePosition, 1, Diagnostics.The_parser_expected_to_find_a_1_to_match_the_0_token_here, "{", "}"));
                                }
                            }
                            return finishNode(factory2.createAssertClause(elements, multiLine), pos);
                        }
                        else {
                            const elements = createNodeArray([], getNodePos(), 
                            /*end*/
                            void 0, 
                            /*hasTrailingComma*/
                            false);
                            return finishNode(factory2.createAssertClause(elements, 
                            /*multiLine*/
                            false), pos);
                        }
                    }
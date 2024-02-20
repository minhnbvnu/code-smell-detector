function isUnParenthesizedAsyncArrowFunctionWorker() {
                        if (token() === 132 /* AsyncKeyword */) {
                            nextToken();
                            if (scanner2.hasPrecedingLineBreak() || token() === 38 /* EqualsGreaterThanToken */) {
                                return 0 /* False */;
                            }
                            const expr = parseBinaryExpressionOrHigher(0 /* Lowest */);
                            if (!scanner2.hasPrecedingLineBreak() && expr.kind === 79 /* Identifier */ && token() === 38 /* EqualsGreaterThanToken */) {
                                return 1 /* True */;
                            }
                        }
                        return 0 /* False */;
                    }
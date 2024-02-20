function inspectExprForWhitespace(expr) {
                let charAfterExpr = sourceCode.getNextChar(expr);

                (charAfterExpr !== ",") && context.report({
                    node: expr,
                    location: {
                        column: sourceCode.getEndingColumn(expr) + 1
                    },
                    message: "There should be no whitespace or comments between Tuple's element and the comma following it."
                });
            }
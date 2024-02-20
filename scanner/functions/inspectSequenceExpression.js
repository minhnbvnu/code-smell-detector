function inspectSequenceExpression(emitted) {
            let node = emitted.node, expressions = node.expressions || [];

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

            if (emitted.exit) {
                return;
            }

            expressions.slice(0, -1).forEach(inspectExprForWhitespace);
        }
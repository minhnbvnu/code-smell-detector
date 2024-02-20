function inspectCallArgForCommaWhitespace(arg) {
                let charAfterArg = sourceCode.getNextChar(arg);

                (charAfterArg !== ",") && context.report({
                    node: arg,
                    location: {
                        column: sourceCode.getEndingColumn(arg) + 1
                    },
                    message: "There should be no whitespace or comments between argument and the comma following it."
                });
            }
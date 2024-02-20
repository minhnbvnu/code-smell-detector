function inspectArrayElementForCommaWhitespace(elem) {
                let charAfterElem = sourceCode.getNextChar(elem);

                (charAfterElem !== ",") && context.report({
                    node: elem,
                    location: {
                        column: sourceCode.getEndingColumn(elem) + 1
                    },
                    message: "There should be no whitespace or comments between Array element and the comma following it."
                });
            }
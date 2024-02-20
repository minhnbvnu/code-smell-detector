function finishReport() {
                    context.report({
                        node,
                        loc: leftParenToken.loc,
                        messageId: "unexpected",
                        fix(fixer) {
                            const parenthesizedSource = sourceCode.text.slice(leftParenToken.range[1], rightParenToken.range[0]);
                            return fixer.replaceTextRange([
                                leftParenToken.range[0],
                                rightParenToken.range[1]
                            ], (requiresLeadingSpace(node) ? " " : "") + parenthesizedSource + (requiresTrailingSpace(node) ? " " : ""));
                        }
                    });
                }
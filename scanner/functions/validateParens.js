function validateParens(parens, elements) {
                const leftParen = parens.leftParen;
                const rightParen = parens.rightParen;
                const tokenAfterLeftParen = sourceCode.getTokenAfter(leftParen);
                const tokenBeforeRightParen = sourceCode.getTokenBefore(rightParen);
                const hasLeftNewline = !astUtils.isTokenOnSameLine(leftParen, tokenAfterLeftParen);
                const hasRightNewline = !astUtils.isTokenOnSameLine(tokenBeforeRightParen, rightParen);
                const needsNewlines = shouldHaveNewlines(elements, hasLeftNewline);
                if (hasLeftNewline && !needsNewlines) {
                    context.report({
                        node: leftParen,
                        messageId: "unexpectedAfter",
                        fix(fixer) {
                            return sourceCode.getText().slice(leftParen.range[1], tokenAfterLeftParen.range[0]).trim()
                                // If there is a comment between the ( and the first element, don't do a fix.
                                ? null
                                : fixer.removeRange([leftParen.range[1], tokenAfterLeftParen.range[0]]);
                        }
                    });
                }
                else if (!hasLeftNewline && needsNewlines) {
                    context.report({
                        node: leftParen,
                        messageId: "expectedAfter",
                        fix: fixer => fixer.insertTextAfter(leftParen, "\n")
                    });
                }
                if (hasRightNewline && !needsNewlines) {
                    context.report({
                        node: rightParen,
                        messageId: "unexpectedBefore",
                        fix(fixer) {
                            return sourceCode.getText().slice(tokenBeforeRightParen.range[1], rightParen.range[0]).trim()
                                // If there is a comment between the last element and the ), don't do a fix.
                                ? null
                                : fixer.removeRange([tokenBeforeRightParen.range[1], rightParen.range[0]]);
                        }
                    });
                }
                else if (!hasRightNewline && needsNewlines) {
                    context.report({
                        node: rightParen,
                        messageId: "expectedBefore",
                        fix: fixer => fixer.insertTextBefore(rightParen, "\n")
                    });
                }
            }
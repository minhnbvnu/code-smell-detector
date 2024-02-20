function validateArguments(parens, elements) {
                const leftParen = parens.leftParen;
                const tokenAfterLeftParen = sourceCode.getTokenAfter(leftParen);
                const hasLeftNewline = !astUtils.isTokenOnSameLine(leftParen, tokenAfterLeftParen);
                const needsNewlines = shouldHaveNewlines(elements, hasLeftNewline);
                for (let i = 0; i <= elements.length - 2; i++) {
                    const currentElement = elements[i];
                    const nextElement = elements[i + 1];
                    const hasNewLine = currentElement.loc.end.line !== nextElement.loc.start.line;
                    if (!hasNewLine && needsNewlines) {
                        context.report({
                            node: currentElement,
                            messageId: "expectedBetween",
                            fix: fixer => fixer.insertTextBefore(nextElement, "\n")
                        });
                    }
                }
            }
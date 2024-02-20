function addParensIndent(tokens) {
                const parenStack = [];
                const parenPairs = [];
                tokens.forEach(nextToken => {
                    // Accumulate a list of parenthesis pairs
                    if (astUtils.isOpeningParenToken(nextToken)) {
                        parenStack.push(nextToken);
                    }
                    else if (astUtils.isClosingParenToken(nextToken)) {
                        parenPairs.unshift({ left: parenStack.pop(), right: nextToken });
                    }
                });
                parenPairs.forEach(pair => {
                    const leftParen = pair.left;
                    const rightParen = pair.right;
                    // We only want to handle parens around expressions, so exclude parentheses that are in function parameters and function call arguments.
                    if (!parameterParens.has(leftParen) && !parameterParens.has(rightParen)) {
                        const parenthesizedTokens = new Set(sourceCode.getTokensBetween(leftParen, rightParen));
                        parenthesizedTokens.forEach(token => {
                            if (!parenthesizedTokens.has(offsets.getFirstDependency(token))) {
                                offsets.setDesiredOffset(token, leftParen, 1);
                            }
                        });
                    }
                    offsets.setDesiredOffset(rightParen, leftParen, 0);
                });
            }
function detectOpenSpaces(node) {
                const lastCalleeToken = sourceCode.getLastToken(node.callee);
                let prevToken = lastCalleeToken, parenToken = sourceCode.getTokenAfter(lastCalleeToken);
                // advances to an open parenthesis.
                while (parenToken &&
                    parenToken.range[1] < node.range[1] &&
                    parenToken.value !== "(") {
                    prevToken = parenToken;
                    parenToken = sourceCode.getTokenAfter(parenToken);
                }
                // look for a space between the callee and the open paren
                if (parenToken &&
                    parenToken.range[1] < node.range[1] &&
                    sourceCode.isSpaceBetweenTokens(prevToken, parenToken)) {
                    context.report({
                        node,
                        loc: lastCalleeToken.loc.start,
                        messageId: "noSpacedFunction",
                        fix(fixer) {
                            return fixer.removeRange([prevToken.range[1], parenToken.range[0]]);
                        }
                    });
                }
            }
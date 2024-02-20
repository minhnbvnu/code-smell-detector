function validateExpression(node) {
                if (node.body.type === "BlockStatement") {
                    return;
                }
                const arrowToken = sourceCode.getTokenBefore(node.body, isNotOpeningParenToken);
                const firstTokenOfBody = sourceCode.getTokenAfter(arrowToken);
                if (arrowToken.loc.end.line === firstTokenOfBody.loc.start.line && option === "below") {
                    context.report({
                        node: firstTokenOfBody,
                        messageId: "expected",
                        fix: fixer => fixer.insertTextBefore(firstTokenOfBody, "\n")
                    });
                }
                else if (arrowToken.loc.end.line !== firstTokenOfBody.loc.start.line && option === "beside") {
                    context.report({
                        node: firstTokenOfBody,
                        messageId: "unexpected",
                        fix(fixer) {
                            if (sourceCode.getFirstTokenBetween(arrowToken, firstTokenOfBody, { includeComments: true, filter: isCommentToken })) {
                                return null;
                            }
                            return fixer.replaceTextRange([arrowToken.range[1], firstTokenOfBody.range[0]], " ");
                        }
                    });
                }
            }
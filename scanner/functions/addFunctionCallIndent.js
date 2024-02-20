function addFunctionCallIndent(node) {
                let openingParen;
                if (node.arguments.length) {
                    openingParen = sourceCode.getFirstTokenBetween(node.callee, node.arguments[0], astUtils.isOpeningParenToken);
                }
                else {
                    openingParen = sourceCode.getLastToken(node, 1);
                }
                const closingParen = sourceCode.getLastToken(node);
                parameterParens.add(openingParen);
                parameterParens.add(closingParen);
                /*
                 * If `?.` token exists, set desired offset for that.
                 * This logic is copied from `MemberExpression`'s.
                 */
                if (node.optional) {
                    const dotToken = sourceCode.getTokenAfter(node.callee, astUtils.isQuestionDotToken);
                    const calleeParenCount = sourceCode.getTokensBetween(node.callee, dotToken, { filter: astUtils.isClosingParenToken }).length;
                    const firstTokenOfCallee = calleeParenCount
                        ? sourceCode.getTokenBefore(node.callee, { skip: calleeParenCount - 1 })
                        : sourceCode.getFirstToken(node.callee);
                    const lastTokenOfCallee = sourceCode.getTokenBefore(dotToken);
                    const offsetBase = lastTokenOfCallee.loc.end.line === openingParen.loc.start.line
                        ? lastTokenOfCallee
                        : firstTokenOfCallee;
                    offsets.setDesiredOffset(dotToken, offsetBase, 1);
                }
                const offsetAfterToken = node.callee.type === "TaggedTemplateExpression" ? sourceCode.getFirstToken(node.callee.quasi) : openingParen;
                const offsetToken = sourceCode.getTokenBefore(offsetAfterToken);
                offsets.setDesiredOffset(openingParen, offsetToken, 0);
                addElementListIndent(node.arguments, openingParen, closingParen, options.CallExpression.arguments);
            }
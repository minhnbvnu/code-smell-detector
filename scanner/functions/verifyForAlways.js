function verifyForAlways(context, prevNode, nextNode, paddingLines) {
        if (paddingLines.length > 0) {
            return;
        }
        context.report({
            node: nextNode,
            messageId: 'expectedBlankLine',
            fix(fixer) {
                const sourceCode = context.getSourceCode();
                let prevToken = getActualLastToken(prevNode, sourceCode);
                const nextToken = sourceCode.getFirstTokenBetween(prevToken, nextNode, {
                    includeComments: true,
                    /**
                     * Skip the trailing comments of the previous node.
                     * This inserts a blank line after the last trailing comment.
                     *
                     * For example:
                     *
                     *     foo(); // trailing comment.
                     *     // comment.
                     *     bar();
                     *
                     * Get fixed to:
                     *
                     *     foo(); // trailing comment.
                     *
                     *     // comment.
                     *     bar();
                     * @param token The token to check.
                     * @returns `true` if the token is not a trailing comment.
                     * @private
                     */
                    filter(token) {
                        if (util.isTokenOnSameLine(prevToken, token)) {
                            prevToken = token;
                            return false;
                        }
                        return true;
                    },
                }) || nextNode;
                const insertText = util.isTokenOnSameLine(prevToken, nextToken)
                    ? '\n\n'
                    : '\n';
                return fixer.insertTextAfter(prevToken, insertText);
            },
        });
    }
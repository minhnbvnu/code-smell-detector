function needsSemicolon(closingBracket) {
                const tokenBefore = sourceCode.getTokenBefore(closingBracket);
                const tokenAfter = sourceCode.getTokenAfter(closingBracket);
                const lastBlockNode = sourceCode.getNodeByRangeIndex(tokenBefore.range[0]);
                if (astUtils.isSemicolonToken(tokenBefore)) {
                    // If the last statement already has a semicolon, don't add another one.
                    return false;
                }
                if (!tokenAfter) {
                    // If there are no statements after this block, there is no need to add a semicolon.
                    return false;
                }
                if (lastBlockNode.type === "BlockStatement" && lastBlockNode.parent.type !== "FunctionExpression" && lastBlockNode.parent.type !== "ArrowFunctionExpression") {
                    /*
                     * If the last node surrounded by curly brackets is a BlockStatement (other than a FunctionExpression or an ArrowFunctionExpression),
                     * don't insert a semicolon. Otherwise, the semicolon would be parsed as a separate statement, which would cause
                     * a SyntaxError if it was followed by `else`.
                     */
                    return false;
                }
                if (tokenBefore.loc.end.line === tokenAfter.loc.start.line) {
                    // If the next token is on the same line, insert a semicolon.
                    return true;
                }
                if (/^[([/`+-]/u.test(tokenAfter.value)) {
                    // If the next token starts with a character that would disrupt ASI, insert a semicolon.
                    return true;
                }
                if (tokenBefore.type === "Punctuator" && (tokenBefore.value === "++" || tokenBefore.value === "--")) {
                    // If the last token is ++ or --, insert a semicolon to avoid disrupting ASI.
                    return true;
                }
                // Otherwise, do not insert a semicolon.
                return false;
            }
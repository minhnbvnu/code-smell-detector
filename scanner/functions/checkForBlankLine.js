function checkForBlankLine(node) {
                /*
                 * lastToken is the last token on the node's line. It will usually also be the last token of the node, but it will
                 * sometimes be second-last if there is a semicolon on a different line.
                 */
                const lastToken = getLastToken(node), 
                /*
                 * If lastToken is the last token of the node, nextToken should be the token after the node. Otherwise, nextToken
                 * is the last token of the node.
                 */
                nextToken = lastToken === sourceCode.getLastToken(node) ? sourceCode.getTokenAfter(node) : sourceCode.getLastToken(node), nextLineNum = lastToken.loc.end.line + 1;
                // Ignore if there is no following statement
                if (!nextToken) {
                    return;
                }
                // Ignore if parent of node is a for variant
                if (isForTypeSpecifier(node.parent.type)) {
                    return;
                }
                // Ignore if parent of node is an export specifier
                if (isExportSpecifier(node.parent.type)) {
                    return;
                }
                /*
                 * Some coding styles use multiple `var` statements, so do nothing if
                 * the next token is a `var` statement.
                 */
                if (nextToken.type === "Keyword" && isVar(nextToken.value)) {
                    return;
                }
                // Ignore if it is last statement in a block
                if (isLastNode(node)) {
                    return;
                }
                // Next statement is not a `var`...
                const noNextLineToken = nextToken.loc.start.line > nextLineNum;
                const hasNextLineComment = (typeof commentEndLine[nextLineNum] !== "undefined");
                if (mode === "never" && noNextLineToken && !hasNextLineComment) {
                    context.report({
                        node,
                        messageId: "unexpected",
                        data: { identifier: node.name },
                        fix(fixer) {
                            const linesBetween = sourceCode.getText().slice(lastToken.range[1], nextToken.range[0]).split(astUtils.LINEBREAK_MATCHER);
                            return fixer.replaceTextRange([lastToken.range[1], nextToken.range[0]], `${linesBetween.slice(0, -1).join("")}\n${linesBetween[linesBetween.length - 1]}`);
                        }
                    });
                }
                // Token on the next line, or comment without blank line
                if (mode === "always" && (!noNextLineToken ||
                    hasNextLineComment && !hasBlankLineAfterComment(nextToken, nextLineNum))) {
                    context.report({
                        node,
                        messageId: "expected",
                        data: { identifier: node.name },
                        fix(fixer) {
                            if ((noNextLineToken ? getLastCommentLineOfBlock(nextLineNum) : lastToken.loc.end.line) === nextToken.loc.start.line) {
                                return fixer.insertTextBefore(nextToken, "\n\n");
                            }
                            return fixer.insertTextBeforeRange([nextToken.range[0] - nextToken.loc.start.column, nextToken.range[1]], "\n");
                        }
                    });
                }
            }
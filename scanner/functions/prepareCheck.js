function prepareCheck(node, body, name, opts) {
                const hasBlock = (body.type === "BlockStatement");
                let expected = null;
                if (hasBlock && (body.body.length !== 1 || areBracesNecessary(body))) {
                    expected = true;
                }
                else if (multiOnly) {
                    expected = false;
                }
                else if (multiLine) {
                    if (!isCollapsedOneLiner(body)) {
                        expected = true;
                    }
                    // otherwise, the body is allowed to have braces or not to have braces
                }
                else if (multiOrNest) {
                    if (hasBlock) {
                        const statement = body.body[0];
                        const leadingCommentsInBlock = sourceCode.getCommentsBefore(statement);
                        expected = !isOneLiner(statement) || leadingCommentsInBlock.length > 0;
                    }
                    else {
                        expected = !isOneLiner(body);
                    }
                }
                else {
                    // default "all"
                    expected = true;
                }
                return {
                    actual: hasBlock,
                    expected,
                    check() {
                        if (this.expected !== null && this.expected !== this.actual) {
                            if (this.expected) {
                                context.report({
                                    node,
                                    loc: body.loc,
                                    messageId: opts && opts.condition ? "missingCurlyAfterCondition" : "missingCurlyAfter",
                                    data: {
                                        name
                                    },
                                    fix: fixer => fixer.replaceText(body, `{${sourceCode.getText(body)}}`)
                                });
                            }
                            else {
                                context.report({
                                    node,
                                    loc: body.loc,
                                    messageId: opts && opts.condition ? "unexpectedCurlyAfterCondition" : "unexpectedCurlyAfter",
                                    data: {
                                        name
                                    },
                                    fix(fixer) {
                                        /*
                                         * `do while` expressions sometimes need a space to be inserted after `do`.
                                         * e.g. `do{foo()} while (bar)` should be corrected to `do foo() while (bar)`
                                         */
                                        const needsPrecedingSpace = node.type === "DoWhileStatement" &&
                                            sourceCode.getTokenBefore(body).range[1] === body.range[0] &&
                                            !astUtils.canTokensBeAdjacent("do", sourceCode.getFirstToken(body, { skip: 1 }));
                                        const openingBracket = sourceCode.getFirstToken(body);
                                        const closingBracket = sourceCode.getLastToken(body);
                                        const lastTokenInBlock = sourceCode.getTokenBefore(closingBracket);
                                        if (needsSemicolon(closingBracket)) {
                                            /*
                                             * If removing braces would cause a SyntaxError due to multiple statements on the same line (or
                                             * change the semantics of the code due to ASI), don't perform a fix.
                                             */
                                            return null;
                                        }
                                        const resultingBodyText = sourceCode.getText().slice(openingBracket.range[1], lastTokenInBlock.range[0]) +
                                            sourceCode.getText(lastTokenInBlock) +
                                            sourceCode.getText().slice(lastTokenInBlock.range[1], closingBracket.range[0]);
                                        return fixer.replaceText(body, (needsPrecedingSpace ? " " : "") + resultingBodyText);
                                    }
                                });
                            }
                        }
                    }
                };
            }
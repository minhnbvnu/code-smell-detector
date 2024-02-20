function displayReport(node) {
                const currentScope = context.getScope();
                context.report({
                    node,
                    messageId: "unexpected",
                    fix(fixer) {
                        if (!isSafeFromNameCollisions(node, currentScope)) {
                            return null;
                        }
                        const sourceCode = context.getSourceCode();
                        const startToken = sourceCode.getFirstToken(node);
                        const elseToken = sourceCode.getTokenBefore(startToken);
                        const source = sourceCode.getText(node);
                        const lastIfToken = sourceCode.getTokenBefore(elseToken);
                        let fixedSource, firstTokenOfElseBlock;
                        if (startToken.type === "Punctuator" && startToken.value === "{") {
                            firstTokenOfElseBlock = sourceCode.getTokenAfter(startToken);
                        }
                        else {
                            firstTokenOfElseBlock = startToken;
                        }
                        /*
                         * If the if block does not have curly braces and does not end in a semicolon
                         * and the else block starts with (, [, /, +, ` or -, then it is not
                         * safe to remove the else keyword, because ASI will not add a semicolon
                         * after the if block
                         */
                        const ifBlockMaybeUnsafe = node.parent.consequent.type !== "BlockStatement" && lastIfToken.value !== ";";
                        const elseBlockUnsafe = /^[([/+`-]/u.test(firstTokenOfElseBlock.value);
                        if (ifBlockMaybeUnsafe && elseBlockUnsafe) {
                            return null;
                        }
                        const endToken = sourceCode.getLastToken(node);
                        const lastTokenOfElseBlock = sourceCode.getTokenBefore(endToken);
                        if (lastTokenOfElseBlock.value !== ";") {
                            const nextToken = sourceCode.getTokenAfter(endToken);
                            const nextTokenUnsafe = nextToken && /^[([/+`-]/u.test(nextToken.value);
                            const nextTokenOnSameLine = nextToken && nextToken.loc.start.line === lastTokenOfElseBlock.loc.start.line;
                            /*
                             * If the else block contents does not end in a semicolon,
                             * and the else block starts with (, [, /, +, ` or -, then it is not
                             * safe to remove the else block, because ASI will not add a semicolon
                             * after the remaining else block contents
                             */
                            if (nextTokenUnsafe || (nextTokenOnSameLine && nextToken.value !== "}")) {
                                return null;
                            }
                        }
                        if (startToken.type === "Punctuator" && startToken.value === "{") {
                            fixedSource = source.slice(1, -1);
                        }
                        else {
                            fixedSource = source;
                        }
                        /*
                         * Extend the replacement range to include the entire
                         * function to avoid conflicting with no-useless-return.
                         * https://github.com/eslint/eslint/issues/8026
                         *
                         * Also, to avoid name collisions between two else blocks.
                         */
                        return new FixTracker(fixer, sourceCode)
                            .retainEnclosingFunction(node)
                            .replaceTextRange([elseToken.range[0], node.range[1]], fixedSource);
                    }
                });
            }
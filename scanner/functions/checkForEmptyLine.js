function checkForEmptyLine(token, { before, after }) {
                // the base rule handles comments away from TS constructs blocks correctly, we skip those
                if (!isCommentNearTSConstruct(token)) {
                    return;
                }
                if (options.applyDefaultIgnorePatterns !== false &&
                    defaultIgnoreRegExp.test(token.value)) {
                    return;
                }
                if (options.ignorePattern && customIgnoreRegExp.test(token.value)) {
                    return;
                }
                const prevLineNum = token.loc.start.line - 1;
                const nextLineNum = token.loc.end.line + 1;
                // we ignore all inline comments
                if (codeAroundComment(token)) {
                    return;
                }
                const interfaceStartAllowed = Boolean(options.allowInterfaceStart) &&
                    isCommentAtInterfaceStart(token);
                const interfaceEndAllowed = Boolean(options.allowInterfaceEnd) && isCommentAtInterfaceEnd(token);
                const typeStartAllowed = Boolean(options.allowTypeStart) && isCommentAtTypeStart(token);
                const typeEndAllowed = Boolean(options.allowTypeEnd) && isCommentAtTypeEnd(token);
                const enumStartAllowed = Boolean(options.allowEnumStart) && isCommentAtEnumStart(token);
                const enumEndAllowed = Boolean(options.allowEnumEnd) && isCommentAtEnumEnd(token);
                const moduleStartAllowed = Boolean(options.allowModuleStart) && isCommentAtModuleStart(token);
                const moduleEndAllowed = Boolean(options.allowModuleEnd) && isCommentAtModuleEnd(token);
                const exceptionStartAllowed = interfaceStartAllowed ||
                    typeStartAllowed ||
                    enumStartAllowed ||
                    moduleStartAllowed;
                const exceptionEndAllowed = interfaceEndAllowed ||
                    typeEndAllowed ||
                    enumEndAllowed ||
                    moduleEndAllowed;
                const previousTokenOrComment = sourceCode.getTokenBefore(token, {
                    includeComments: true,
                });
                const nextTokenOrComment = sourceCode.getTokenAfter(token, {
                    includeComments: true,
                });
                // check for newline before
                if (!exceptionStartAllowed &&
                    before &&
                    !commentAndEmptyLines.has(prevLineNum) &&
                    !(util.isCommentToken(previousTokenOrComment) &&
                        util.isTokenOnSameLine(previousTokenOrComment, token))) {
                    const lineStart = token.range[0] - token.loc.start.column;
                    const range = [lineStart, lineStart];
                    context.report({
                        node: token,
                        messageId: 'before',
                        fix(fixer) {
                            return fixer.insertTextBeforeRange(range, '\n');
                        },
                    });
                }
                // check for newline after
                if (!exceptionEndAllowed &&
                    after &&
                    !commentAndEmptyLines.has(nextLineNum) &&
                    !(util.isCommentToken(nextTokenOrComment) &&
                        util.isTokenOnSameLine(token, nextTokenOrComment))) {
                    context.report({
                        node: token,
                        messageId: 'after',
                        fix(fixer) {
                            return fixer.insertTextAfter(token, '\n');
                        },
                    });
                }
            }
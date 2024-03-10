                lines.forEach((line, i) => {
                    // i is zero-indexed, line numbers are one-indexed
                    const lineNumber = i + 1;
                    /*
                     * if we're checking comment length; we need to know whether this
                     * line is a comment
                     */
                    let lineIsComment = false;
                    let textToMeasure;
                    /*
                     * We can short-circuit the comment checks if we're already out of
                     * comments to check.
                     */
                    if (commentsIndex < comments.length) {
                        let comment = null;
                        // iterate over comments until we find one past the current line
                        do {
                            comment = comments[++commentsIndex];
                        } while (comment && comment.loc.start.line <= lineNumber);
                        // and step back by one
                        comment = comments[--commentsIndex];
                        if (isFullLineComment(line, lineNumber, comment)) {
                            lineIsComment = true;
                            textToMeasure = line;
                        }
                        else if (ignoreTrailingComments && isTrailingComment(line, lineNumber, comment)) {
                            textToMeasure = stripTrailingComment(line, comment);
                            // ignore multiple trailing comments in the same line
                            let lastIndex = commentsIndex;
                            while (isTrailingComment(textToMeasure, lineNumber, comments[--lastIndex])) {
                                textToMeasure = stripTrailingComment(textToMeasure, comments[lastIndex]);
                            }
                        }
                        else {
                            textToMeasure = line;
                        }
                    }
                    else {
                        textToMeasure = line;
                    }
                    if (ignorePattern && ignorePattern.test(textToMeasure) ||
                        ignoreUrls && URL_REGEXP.test(textToMeasure) ||
                        ignoreStrings && stringsByLine[lineNumber] ||
                        ignoreTemplateLiterals && templateLiteralsByLine[lineNumber] ||
                        ignoreRegExpLiterals && regExpLiteralsByLine[lineNumber]) {
                        // ignore this line
                        return;
                    }
                    const lineLength = computeLineLength(textToMeasure, tabWidth);
                    const commentLengthApplies = lineIsComment && maxCommentLength;
                    if (lineIsComment && ignoreComments) {
                        return;
                    }
                    const loc = {
                        start: {
                            line: lineNumber,
                            column: 0
                        },
                        end: {
                            line: lineNumber,
                            column: textToMeasure.length
                        }
                    };
                    if (commentLengthApplies) {
                        if (lineLength > maxCommentLength) {
                            context.report({
                                node,
                                loc,
                                messageId: "maxComment",
                                data: {
                                    lineLength,
                                    maxCommentLength
                                }
                            });
                        }
                    }
                    else if (lineLength > maxLength) {
                        context.report({
                            node,
                            loc,
                            messageId: "max",
                            data: {
                                lineLength,
                                maxLength
                            }
                        });
                    }
                });
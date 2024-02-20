function toggleMultilineComment(fileName, textRange, insertComment, isInsideJsx) {
                var _a3;
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                const textChanges2 = [];
                const { text } = sourceFile;
                let hasComment = false;
                let isCommenting = insertComment || false;
                const positions = [];
                let { pos } = textRange;
                const isJsx = isInsideJsx !== void 0 ? isInsideJsx : isInsideJsxElement(sourceFile, pos);
                const openMultiline = isJsx ? "{/*" : "/*";
                const closeMultiline = isJsx ? "*/}" : "*/";
                const openMultilineRegex = isJsx ? "\\{\\/\\*" : "\\/\\*";
                const closeMultilineRegex = isJsx ? "\\*\\/\\}" : "\\*\\/";
                while (pos <= textRange.end) {
                    const offset = text.substr(pos, openMultiline.length) === openMultiline ? openMultiline.length : 0;
                    const commentRange = isInComment(sourceFile, pos + offset);
                    if (commentRange) {
                        if (isJsx) {
                            commentRange.pos--;
                            commentRange.end++;
                        }
                        positions.push(commentRange.pos);
                        if (commentRange.kind === 3 /* MultiLineCommentTrivia */) {
                            positions.push(commentRange.end);
                        }
                        hasComment = true;
                        pos = commentRange.end + 1;
                    }
                    else {
                        const newPos = text.substring(pos, textRange.end).search(`(${openMultilineRegex})|(${closeMultilineRegex})`);
                        isCommenting = insertComment !== void 0 ? insertComment : isCommenting || !isTextWhiteSpaceLike(text, pos, newPos === -1 ? textRange.end : pos + newPos);
                        pos = newPos === -1 ? textRange.end + 1 : pos + newPos + closeMultiline.length;
                    }
                }
                if (isCommenting || !hasComment) {
                    if (((_a3 = isInComment(sourceFile, textRange.pos)) == null ? void 0 : _a3.kind) !== 2 /* SingleLineCommentTrivia */) {
                        insertSorted(positions, textRange.pos, compareValues);
                    }
                    insertSorted(positions, textRange.end, compareValues);
                    const firstPos = positions[0];
                    if (text.substr(firstPos, openMultiline.length) !== openMultiline) {
                        textChanges2.push({
                            newText: openMultiline,
                            span: {
                                length: 0,
                                start: firstPos
                            }
                        });
                    }
                    for (let i = 1; i < positions.length - 1; i++) {
                        if (text.substr(positions[i] - closeMultiline.length, closeMultiline.length) !== closeMultiline) {
                            textChanges2.push({
                                newText: closeMultiline,
                                span: {
                                    length: 0,
                                    start: positions[i]
                                }
                            });
                        }
                        if (text.substr(positions[i], openMultiline.length) !== openMultiline) {
                            textChanges2.push({
                                newText: openMultiline,
                                span: {
                                    length: 0,
                                    start: positions[i]
                                }
                            });
                        }
                    }
                    if (textChanges2.length % 2 !== 0) {
                        textChanges2.push({
                            newText: closeMultiline,
                            span: {
                                length: 0,
                                start: positions[positions.length - 1]
                            }
                        });
                    }
                }
                else {
                    for (const pos2 of positions) {
                        const from = pos2 - closeMultiline.length > 0 ? pos2 - closeMultiline.length : 0;
                        const offset = text.substr(from, closeMultiline.length) === closeMultiline ? closeMultiline.length : 0;
                        textChanges2.push({
                            newText: "",
                            span: {
                                length: openMultiline.length,
                                start: pos2 - offset
                            }
                        });
                    }
                }
                return textChanges2;
            }
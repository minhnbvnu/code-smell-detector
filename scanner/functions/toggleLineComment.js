function toggleLineComment(fileName, textRange, insertComment) {
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                const textChanges2 = [];
                const { lineStarts, firstLine, lastLine } = getLinesForRange(sourceFile, textRange);
                let isCommenting = insertComment || false;
                let leftMostPosition = Number.MAX_VALUE;
                const lineTextStarts = /* @__PURE__ */ new Map();
                const firstNonWhitespaceCharacterRegex = new RegExp(/\S/);
                const isJsx = isInsideJsxElement(sourceFile, lineStarts[firstLine]);
                const openComment = isJsx ? "{/*" : "//";
                for (let i = firstLine; i <= lastLine; i++) {
                    const lineText = sourceFile.text.substring(lineStarts[i], sourceFile.getLineEndOfPosition(lineStarts[i]));
                    const regExec = firstNonWhitespaceCharacterRegex.exec(lineText);
                    if (regExec) {
                        leftMostPosition = Math.min(leftMostPosition, regExec.index);
                        lineTextStarts.set(i.toString(), regExec.index);
                        if (lineText.substr(regExec.index, openComment.length) !== openComment) {
                            isCommenting = insertComment === void 0 || insertComment;
                        }
                    }
                }
                for (let i = firstLine; i <= lastLine; i++) {
                    if (firstLine !== lastLine && lineStarts[i] === textRange.end) {
                        continue;
                    }
                    const lineTextStart = lineTextStarts.get(i.toString());
                    if (lineTextStart !== void 0) {
                        if (isJsx) {
                            textChanges2.push.apply(textChanges2, toggleMultilineComment(fileName, { pos: lineStarts[i] + leftMostPosition, end: sourceFile.getLineEndOfPosition(lineStarts[i]) }, isCommenting, isJsx));
                        }
                        else if (isCommenting) {
                            textChanges2.push({
                                newText: openComment,
                                span: {
                                    length: 0,
                                    start: lineStarts[i] + leftMostPosition
                                }
                            });
                        }
                        else if (sourceFile.text.substr(lineStarts[i] + lineTextStart, openComment.length) === openComment) {
                            textChanges2.push({
                                newText: "",
                                span: {
                                    length: openComment.length,
                                    start: lineStarts[i] + lineTextStart
                                }
                            });
                        }
                    }
                }
                return textChanges2;
            }
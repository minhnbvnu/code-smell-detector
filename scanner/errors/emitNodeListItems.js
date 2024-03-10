function emitNodeListItems(emit2, parentNode, children, format, parenthesizerRule, start, count, hasTrailingComma, childrenTextRange) {
                const mayEmitInterveningComments = (format & 262144 /* NoInterveningComments */) === 0;
                let shouldEmitInterveningComments = mayEmitInterveningComments;
                const leadingLineTerminatorCount = getLeadingLineTerminatorCount(parentNode, children[start], format);
                if (leadingLineTerminatorCount) {
                    writeLine(leadingLineTerminatorCount);
                    shouldEmitInterveningComments = false;
                }
                else if (format & 256 /* SpaceBetweenBraces */) {
                    writeSpace();
                }
                if (format & 128 /* Indented */) {
                    increaseIndent();
                }
                const emitListItem = getEmitListItem(emit2, parenthesizerRule);
                let previousSibling;
                let previousSourceFileTextKind;
                let shouldDecreaseIndentAfterEmit = false;
                for (let i = 0; i < count; i++) {
                    const child = children[start + i];
                    if (format & 32 /* AsteriskDelimited */) {
                        writeLine();
                        writeDelimiter(format);
                    }
                    else if (previousSibling) {
                        if (format & 60 /* DelimitersMask */ && previousSibling.end !== (parentNode ? parentNode.end : -1)) {
                            const previousSiblingEmitFlags = getEmitFlags(previousSibling);
                            if (!(previousSiblingEmitFlags & 2048 /* NoTrailingComments */)) {
                                emitLeadingCommentsOfPosition(previousSibling.end);
                            }
                        }
                        writeDelimiter(format);
                        recordBundleFileInternalSectionEnd(previousSourceFileTextKind);
                        const separatingLineTerminatorCount = getSeparatingLineTerminatorCount(previousSibling, child, format);
                        if (separatingLineTerminatorCount > 0) {
                            if ((format & (3 /* LinesMask */ | 128 /* Indented */)) === 0 /* SingleLine */) {
                                increaseIndent();
                                shouldDecreaseIndentAfterEmit = true;
                            }
                            writeLine(separatingLineTerminatorCount);
                            shouldEmitInterveningComments = false;
                        }
                        else if (previousSibling && format & 512 /* SpaceBetweenSiblings */) {
                            writeSpace();
                        }
                    }
                    previousSourceFileTextKind = recordBundleFileInternalSectionStart(child);
                    if (shouldEmitInterveningComments) {
                        const commentRange = getCommentRange(child);
                        emitTrailingCommentsOfPosition(commentRange.pos);
                    }
                    else {
                        shouldEmitInterveningComments = mayEmitInterveningComments;
                    }
                    nextListElementPos = child.pos;
                    emitListItem(child, emit2, parenthesizerRule, i);
                    if (shouldDecreaseIndentAfterEmit) {
                        decreaseIndent();
                        shouldDecreaseIndentAfterEmit = false;
                    }
                    previousSibling = child;
                }
                const emitFlags = previousSibling ? getEmitFlags(previousSibling) : 0;
                const skipTrailingComments = commentsDisabled || !!(emitFlags & 2048 /* NoTrailingComments */);
                const emitTrailingComma = hasTrailingComma && format & 64 /* AllowTrailingComma */ && format & 16 /* CommaDelimited */;
                if (emitTrailingComma) {
                    if (previousSibling && !skipTrailingComments) {
                        emitTokenWithComment(27 /* CommaToken */, previousSibling.end, writePunctuation, previousSibling);
                    }
                    else {
                        writePunctuation(",");
                    }
                }
                if (previousSibling && (parentNode ? parentNode.end : -1) !== previousSibling.end && format & 60 /* DelimitersMask */ && !skipTrailingComments) {
                    emitLeadingCommentsOfPosition(emitTrailingComma && (childrenTextRange == null ? void 0 : childrenTextRange.end) ? childrenTextRange.end : previousSibling.end);
                }
                if (format & 128 /* Indented */) {
                    decreaseIndent();
                }
                recordBundleFileInternalSectionEnd(previousSourceFileTextKind);
                const closingLineTerminatorCount = getClosingLineTerminatorCount(parentNode, children[start + count - 1], format, childrenTextRange);
                if (closingLineTerminatorCount) {
                    writeLine(closingLineTerminatorCount);
                }
                else if (format & (2097152 /* SpaceAfterList */ | 256 /* SpaceBetweenBraces */)) {
                    writeSpace();
                }
            }
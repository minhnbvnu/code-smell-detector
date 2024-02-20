function getInsertionPositionAtSourceFileTop(sourceFile) {
            let lastPrologue;
            for (const node of sourceFile.statements) {
                if (isPrologueDirective(node)) {
                    lastPrologue = node;
                }
                else {
                    break;
                }
            }
            let position = 0;
            const text = sourceFile.text;
            if (lastPrologue) {
                position = lastPrologue.end;
                advancePastLineBreak();
                return position;
            }
            const shebang = getShebang(text);
            if (shebang !== void 0) {
                position = shebang.length;
                advancePastLineBreak();
            }
            const ranges = getLeadingCommentRanges(text, position);
            if (!ranges)
                return position;
            let lastComment;
            let firstNodeLine;
            for (const range of ranges) {
                if (range.kind === 3 /* MultiLineCommentTrivia */) {
                    if (isPinnedComment(text, range.pos)) {
                        lastComment = { range, pinnedOrTripleSlash: true };
                        continue;
                    }
                }
                else if (isRecognizedTripleSlashComment(text, range.pos, range.end)) {
                    lastComment = { range, pinnedOrTripleSlash: true };
                    continue;
                }
                if (lastComment) {
                    if (lastComment.pinnedOrTripleSlash)
                        break;
                    const commentLine = sourceFile.getLineAndCharacterOfPosition(range.pos).line;
                    const lastCommentEndLine = sourceFile.getLineAndCharacterOfPosition(lastComment.range.end).line;
                    if (commentLine >= lastCommentEndLine + 2)
                        break;
                }
                if (sourceFile.statements.length) {
                    if (firstNodeLine === void 0)
                        firstNodeLine = sourceFile.getLineAndCharacterOfPosition(sourceFile.statements[0].getStart()).line;
                    const commentEndLine = sourceFile.getLineAndCharacterOfPosition(range.end).line;
                    if (firstNodeLine < commentEndLine + 2)
                        break;
                }
                lastComment = { range, pinnedOrTripleSlash: false };
            }
            if (lastComment) {
                position = lastComment.range.end;
                advancePastLineBreak();
            }
            return position;
            function advancePastLineBreak() {
                if (position < text.length) {
                    const charCode = text.charCodeAt(position);
                    if (isLineBreak(charCode)) {
                        position++;
                        if (position < text.length && charCode === 13 /* carriageReturn */ && text.charCodeAt(position) === 10 /* lineFeed */) {
                            position++;
                        }
                    }
                }
            }
        }
function emitLeadingComment(commentPos, commentEnd, kind, hasTrailingNewLine, rangePos) {
                if (!currentSourceFile || !shouldWriteComment(currentSourceFile.text, commentPos))
                    return;
                if (!hasWrittenComment) {
                    emitNewLineBeforeLeadingCommentOfPosition(getCurrentLineMap(), writer, rangePos, commentPos);
                    hasWrittenComment = true;
                }
                emitPos(commentPos);
                writeCommentRange(currentSourceFile.text, getCurrentLineMap(), writer, commentPos, commentEnd, newLine);
                emitPos(commentEnd);
                if (hasTrailingNewLine) {
                    writer.writeLine();
                }
                else if (kind === 3 /* MultiLineCommentTrivia */) {
                    writer.writeSpace(" ");
                }
            }
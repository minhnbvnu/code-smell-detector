function emitTrailingCommentOfPositionNoNewline(commentPos, commentEnd, kind) {
                if (!currentSourceFile)
                    return;
                emitPos(commentPos);
                writeCommentRange(currentSourceFile.text, getCurrentLineMap(), writer, commentPos, commentEnd, newLine);
                emitPos(commentEnd);
                if (kind === 2 /* SingleLineCommentTrivia */) {
                    writer.writeLine();
                }
            }
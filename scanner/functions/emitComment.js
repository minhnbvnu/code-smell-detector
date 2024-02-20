function emitComment(text, lineMap, writer2, commentPos, commentEnd, newLine2) {
                if (!currentSourceFile || !shouldWriteComment(currentSourceFile.text, commentPos))
                    return;
                emitPos(commentPos);
                writeCommentRange(text, lineMap, writer2, commentPos, commentEnd, newLine2);
                emitPos(commentEnd);
            }
function emitTrailingComment(commentPos, commentEnd, _kind, hasTrailingNewLine) {
                if (!currentSourceFile || !shouldWriteComment(currentSourceFile.text, commentPos))
                    return;
                if (!writer.isAtStartOfLine()) {
                    writer.writeSpace(" ");
                }
                emitPos(commentPos);
                writeCommentRange(currentSourceFile.text, getCurrentLineMap(), writer, commentPos, commentEnd, newLine);
                emitPos(commentEnd);
                if (hasTrailingNewLine) {
                    writer.writeLine();
                }
            }
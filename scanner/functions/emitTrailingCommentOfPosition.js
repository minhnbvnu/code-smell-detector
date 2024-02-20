function emitTrailingCommentOfPosition(commentPos, commentEnd, _kind, hasTrailingNewLine) {
                if (!currentSourceFile)
                    return;
                emitPos(commentPos);
                writeCommentRange(currentSourceFile.text, getCurrentLineMap(), writer, commentPos, commentEnd, newLine);
                emitPos(commentEnd);
                if (hasTrailingNewLine) {
                    writer.writeLine();
                }
                else {
                    writer.writeSpace(" ");
                }
            }
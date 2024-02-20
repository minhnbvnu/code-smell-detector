function writeTrimmedCurrentLine(text, commentEnd, writer, newLine, pos, nextLineStart) {
            const end = Math.min(commentEnd, nextLineStart - 1);
            const currentLineText = trimString(text.substring(pos, end));
            if (currentLineText) {
                writer.writeComment(currentLineText);
                if (end !== commentEnd) {
                    writer.writeLine();
                }
            }
            else {
                writer.rawWrite(newLine);
            }
        }
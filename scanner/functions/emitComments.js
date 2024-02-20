function emitComments(text, lineMap, writer, comments, leadingSeparator, trailingSeparator, newLine, writeComment) {
            if (comments && comments.length > 0) {
                if (leadingSeparator) {
                    writer.writeSpace(" ");
                }
                let emitInterveningSeparator = false;
                for (const comment of comments) {
                    if (emitInterveningSeparator) {
                        writer.writeSpace(" ");
                        emitInterveningSeparator = false;
                    }
                    writeComment(text, lineMap, writer, comment.pos, comment.end, newLine);
                    if (comment.hasTrailingNewLine) {
                        writer.writeLine();
                    }
                    else {
                        emitInterveningSeparator = true;
                    }
                }
                if (emitInterveningSeparator && trailingSeparator) {
                    writer.writeSpace(" ");
                }
            }
        }
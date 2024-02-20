function emitTrailingSynthesizedComment(comment) {
                if (!writer.isAtStartOfLine()) {
                    writer.writeSpace(" ");
                }
                writeSynthesizedComment(comment);
                if (comment.hasTrailingNewLine) {
                    writer.writeLine();
                }
            }
function emitLeadingSynthesizedComment(comment) {
                if (comment.hasLeadingNewline || comment.kind === 2 /* SingleLineCommentTrivia */) {
                    writer.writeLine();
                }
                writeSynthesizedComment(comment);
                if (comment.hasTrailingNewLine || comment.kind === 2 /* SingleLineCommentTrivia */) {
                    writer.writeLine();
                }
                else {
                    writer.writeSpace(" ");
                }
            }
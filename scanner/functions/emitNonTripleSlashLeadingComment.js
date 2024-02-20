function emitNonTripleSlashLeadingComment(commentPos, commentEnd, kind, hasTrailingNewLine, rangePos) {
                if (!isTripleSlashComment(commentPos, commentEnd)) {
                    emitLeadingComment(commentPos, commentEnd, kind, hasTrailingNewLine, rangePos);
                }
            }
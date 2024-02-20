function emitNewLineBeforeLeadingCommentOfPosition(lineMap, writer, pos, commentPos) {
            if (pos !== commentPos && getLineOfLocalPositionFromLineMap(lineMap, pos) !== getLineOfLocalPositionFromLineMap(lineMap, commentPos)) {
                writer.writeLine();
            }
        }
function emitNewLineBeforeLeadingCommentsOfPosition(lineMap, writer, pos, leadingComments) {
            if (leadingComments && leadingComments.length && pos !== leadingComments[0].pos && getLineOfLocalPositionFromLineMap(lineMap, pos) !== getLineOfLocalPositionFromLineMap(lineMap, leadingComments[0].pos)) {
                writer.writeLine();
            }
        }
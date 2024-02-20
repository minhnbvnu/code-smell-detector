function emitNewLineBeforeLeadingComments(lineMap, writer, node, leadingComments) {
            emitNewLineBeforeLeadingCommentsOfPosition(lineMap, writer, node.pos, leadingComments);
        }
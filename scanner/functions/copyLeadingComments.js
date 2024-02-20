function copyLeadingComments(sourceNode, targetNode, sourceFile, commentKind, hasTrailingNewLine) {
            forEachLeadingCommentRange(sourceFile.text, sourceNode.pos, getAddCommentsFunction(targetNode, sourceFile, commentKind, hasTrailingNewLine, addSyntheticLeadingComment));
        }
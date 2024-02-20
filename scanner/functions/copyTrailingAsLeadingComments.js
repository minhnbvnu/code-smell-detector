function copyTrailingAsLeadingComments(sourceNode, targetNode, sourceFile, commentKind, hasTrailingNewLine) {
            forEachTrailingCommentRange(sourceFile.text, sourceNode.pos, getAddCommentsFunction(targetNode, sourceFile, commentKind, hasTrailingNewLine, addSyntheticLeadingComment));
        }
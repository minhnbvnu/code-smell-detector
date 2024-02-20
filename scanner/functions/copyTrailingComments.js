function copyTrailingComments(sourceNode, targetNode, sourceFile, commentKind, hasTrailingNewLine) {
            forEachTrailingCommentRange(sourceFile.text, sourceNode.end, getAddCommentsFunction(targetNode, sourceFile, commentKind, hasTrailingNewLine, addSyntheticTrailingComment));
        }
function copyComments(sourceNode, targetNode) {
            const sourceFile = sourceNode.getSourceFile();
            const text = sourceFile.text;
            if (hasLeadingLineBreak(sourceNode, text)) {
                copyLeadingComments(sourceNode, targetNode, sourceFile);
            }
            else {
                copyTrailingAsLeadingComments(sourceNode, targetNode, sourceFile);
            }
            copyTrailingComments(sourceNode, targetNode, sourceFile);
        }
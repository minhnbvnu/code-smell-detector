function getSourceTextOfNodeFromSourceFile(sourceFile, node, includeTrivia = false) {
            return getTextOfNodeFromSourceText(sourceFile.text, node, includeTrivia);
        }
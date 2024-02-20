function getOriginalSourceFile(sourceFile) {
            return getParseTreeNode(sourceFile, isSourceFile) || sourceFile;
        }
function getTextOfNode(node, includeTrivia = false) {
            return getSourceTextOfNodeFromSourceFile(getSourceFileOfNode(node), node, includeTrivia);
        }
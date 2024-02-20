function isWhiteSpaceOnlyJsxText(node) {
            return isJsxText(node) && node.containsOnlyTriviaWhiteSpaces;
        }
function updateJsxText(node, text, containsOnlyTriviaWhiteSpaces) {
                return node.text !== text || node.containsOnlyTriviaWhiteSpaces !== containsOnlyTriviaWhiteSpaces ? update(createJsxText(text, containsOnlyTriviaWhiteSpaces), node) : node;
            }
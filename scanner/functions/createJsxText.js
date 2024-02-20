function createJsxText(text, containsOnlyTriviaWhiteSpaces) {
                const node = createBaseNode(11 /* JsxText */);
                node.text = text;
                node.containsOnlyTriviaWhiteSpaces = !!containsOnlyTriviaWhiteSpaces;
                node.transformFlags |= 2 /* ContainsJsx */;
                return node;
            }
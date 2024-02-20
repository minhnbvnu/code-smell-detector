function getJsDocTagAtPosition(node, position) {
            return findAncestor(node, (n) => isJSDocTag(n) && rangeContainsPosition(n, position) ? true : isJSDoc(n) ? "quit" : false);
        }
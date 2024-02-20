function findContainingList(node) {
            const syntaxList = find(node.parent.getChildren(), (c) => isSyntaxList(c) && rangeContainsRange(c, node));
            Debug.assert(!syntaxList || contains(syntaxList.getChildren(), node));
            return syntaxList;
        }
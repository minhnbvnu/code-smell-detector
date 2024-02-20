function stringifyNode(node, sourceCode) {
        return removeSpaces(sourceCode.getText(node));
    }
function getTopConcatBinaryExpression(node) {
        let currentNode = node;
        while (isConcatenation(currentNode.parent)) {
            currentNode = currentNode.parent;
        }
        return currentNode;
    }
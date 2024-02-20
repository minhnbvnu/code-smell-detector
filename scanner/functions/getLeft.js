function getLeft(node) {
        let left = node.left;
        while (isConcatenation(left)) {
            left = left.right;
        }
        return left;
    }
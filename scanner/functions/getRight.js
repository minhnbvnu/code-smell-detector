function getRight(node) {
        let right = node.right;
        while (isConcatenation(right)) {
            right = right.left;
        }
        return right;
    }
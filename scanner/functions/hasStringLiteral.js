function hasStringLiteral(node) {
        if (isConcatenation(node)) {
            // `left` is deeper than `right` normally.
            return hasStringLiteral(node.right) || hasStringLiteral(node.left);
        }
        return astUtils.isStringLiteral(node);
    }
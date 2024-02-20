function isNegativeLookaround(node) {
        return isLookaround(node) && node.negate;
    }
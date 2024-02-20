function hasJSXAncestor(node) {
        return !!findFirstMatchingAncestor(node, isJSXToken);
    }
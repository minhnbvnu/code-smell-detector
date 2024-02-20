function isScopeBoundary(node) {
        return isFunctionScopeBoundary(node) || isBlockScopeBoundary(node) || isTypeScopeBoundary(node);
    }
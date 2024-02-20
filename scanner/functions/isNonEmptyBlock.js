function isNonEmptyBlock(n) {
    return isBlock(n) && n.children.length > 0;
}
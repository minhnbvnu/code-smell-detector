function _progressive(nodeLevel, currentLevel, options) {
    return Math.min(nodeLevel,
        currentLevel + (options.increment || 1));
}
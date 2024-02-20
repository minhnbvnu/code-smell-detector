function isLoop(node) {
        return Boolean(node && anyLoopPattern.test(node.type));
    }
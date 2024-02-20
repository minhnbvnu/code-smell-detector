function isFallbackFunc(node) {
            return isFunc(node) && node.name === null;
        }
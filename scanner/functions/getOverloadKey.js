function getOverloadKey(node) {
        const info = getOverloadInfo(node);
        return ((node.computed ? '0' : '1') +
            (node.static ? '0' : '1') +
            info);
    }
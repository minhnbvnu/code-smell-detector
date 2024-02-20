function isLet(node) {
            return !!(getCombinedNodeFlags(node) & 1 /* Let */);
        }
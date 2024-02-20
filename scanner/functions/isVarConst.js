function isVarConst(node) {
            return !!(getCombinedNodeFlags(node) & 2 /* Const */);
        }
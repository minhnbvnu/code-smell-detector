function isEnumConst(node) {
            return !!(getCombinedModifierFlags(node) & 2048 /* Const */);
        }
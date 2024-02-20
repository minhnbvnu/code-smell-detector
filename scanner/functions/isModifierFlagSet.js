function isModifierFlagSet(node, flag) {
        return (ts.getCombinedModifierFlags(node) & flag) !== 0;
    }
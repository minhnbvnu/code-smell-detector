function getLastModifier(node) {
        var _a;
        const modifiers = (0, getModifiers_1.getModifiers)(node);
        if (modifiers == null) {
            return null;
        }
        return (_a = modifiers[modifiers.length - 1]) !== null && _a !== void 0 ? _a : null;
    }
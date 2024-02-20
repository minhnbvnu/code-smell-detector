function hasModifier(modifierKind, node) {
        const modifiers = (0, getModifiers_1.getModifiers)(node);
        return (modifiers === null || modifiers === void 0 ? void 0 : modifiers.some(modifier => modifier.kind === modifierKind)) === true;
    }
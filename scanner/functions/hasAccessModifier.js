function hasAccessModifier(node) {
        return isModifierFlagSet(node, ts.ModifierFlags.AccessibilityModifier);
    }
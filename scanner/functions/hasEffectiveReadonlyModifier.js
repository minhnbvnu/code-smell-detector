function hasEffectiveReadonlyModifier(node) {
            return hasEffectiveModifier(node, 64 /* Readonly */);
        }
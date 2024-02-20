function ensureModifiers(node) {
                const currentFlags = getEffectiveModifierFlags(node);
                const newFlags = ensureModifierFlags(node);
                if (currentFlags === newFlags) {
                    return visitArray(node.modifiers, (n) => tryCast(n, isModifier), isModifier);
                }
                return factory2.createModifiersFromModifierFlags(newFlags);
            }
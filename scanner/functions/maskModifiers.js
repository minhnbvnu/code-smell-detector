function maskModifiers(node, modifierMask, modifierAdditions) {
            return factory.createModifiersFromModifierFlags(maskModifierFlags(node, modifierMask, modifierAdditions));
        }
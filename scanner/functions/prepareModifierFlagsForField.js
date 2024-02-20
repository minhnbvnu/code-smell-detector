function prepareModifierFlagsForField(modifierFlags) {
            modifierFlags &= ~4 /* Public */;
            modifierFlags &= ~16 /* Protected */;
            modifierFlags |= 8 /* Private */;
            return modifierFlags;
        }
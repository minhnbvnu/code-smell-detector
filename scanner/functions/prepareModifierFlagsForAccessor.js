function prepareModifierFlagsForAccessor(modifierFlags) {
            modifierFlags &= ~64 /* Readonly */;
            modifierFlags &= ~8 /* Private */;
            if (!(modifierFlags & 16 /* Protected */)) {
                modifierFlags |= 4 /* Public */;
            }
            return modifierFlags;
        }
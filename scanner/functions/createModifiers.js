function createModifiers() {
                let modifiers2;
                if (modifierFlags) {
                    modifiers2 = combine(modifiers2, factory.createModifiersFromModifierFlags(modifierFlags));
                }
                if (shouldAddOverrideKeyword()) {
                    modifiers2 = append(modifiers2, factory.createToken(161 /* OverrideKeyword */));
                }
                return modifiers2 && factory.createNodeArray(modifiers2);
            }
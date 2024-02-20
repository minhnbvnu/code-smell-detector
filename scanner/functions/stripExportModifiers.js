function stripExportModifiers(statement) {
                if (isImportEqualsDeclaration(statement) || hasEffectiveModifier(statement, 1024 /* Default */) || !canHaveModifiers(statement)) {
                    return statement;
                }
                const modifiers = factory2.createModifiersFromModifierFlags(getEffectiveModifierFlags(statement) & (258047 /* All */ ^ 1 /* Export */));
                return factory2.updateModifiers(statement, modifiers);
            }
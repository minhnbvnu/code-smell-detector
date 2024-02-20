function removeExportModifier(node) {
                        const flags = getEffectiveModifierFlags(node) & ~1 /* Export */;
                        return factory.updateModifiers(node, flags);
                    }
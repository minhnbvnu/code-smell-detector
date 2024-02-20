function addExportModifier(node) {
                        const flags = (getEffectiveModifierFlags(node) | 1 /* Export */) & ~2 /* Ambient */;
                        return factory.updateModifiers(node, flags);
                    }
function isStaticSymbol(symbol) {
                        if (!symbol.valueDeclaration)
                            return false;
                        const modifierFlags = getEffectiveModifierFlags(symbol.valueDeclaration);
                        return !!(modifierFlags & 32 /* Static */);
                    }
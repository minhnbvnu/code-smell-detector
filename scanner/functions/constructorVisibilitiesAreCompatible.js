function constructorVisibilitiesAreCompatible(sourceSignature, targetSignature, reportErrors2) {
                    if (!sourceSignature.declaration || !targetSignature.declaration) {
                        return true;
                    }
                    const sourceAccessibility = getSelectedEffectiveModifierFlags(sourceSignature.declaration, 24 /* NonPublicAccessibilityModifier */);
                    const targetAccessibility = getSelectedEffectiveModifierFlags(targetSignature.declaration, 24 /* NonPublicAccessibilityModifier */);
                    if (targetAccessibility === 8 /* Private */) {
                        return true;
                    }
                    if (targetAccessibility === 16 /* Protected */ && sourceAccessibility !== 8 /* Private */) {
                        return true;
                    }
                    if (targetAccessibility !== 16 /* Protected */ && !sourceAccessibility) {
                        return true;
                    }
                    if (reportErrors2) {
                        reportError(Diagnostics.Cannot_assign_a_0_constructor_type_to_a_1_constructor_type, visibilityToString(sourceAccessibility), visibilityToString(targetAccessibility));
                    }
                    return false;
                }
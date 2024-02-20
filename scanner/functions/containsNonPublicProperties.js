function containsNonPublicProperties(props) {
            return some(props, (p) => !!(getDeclarationModifierFlagsFromSymbol(p) & 24 /* NonPublicAccessibilityModifier */));
        }
function compareProperties2(sourceProp, targetProp, compareTypes) {
                if (sourceProp === targetProp) {
                    return -1 /* True */;
                }
                const sourcePropAccessibility = getDeclarationModifierFlagsFromSymbol(sourceProp) & 24 /* NonPublicAccessibilityModifier */;
                const targetPropAccessibility = getDeclarationModifierFlagsFromSymbol(targetProp) & 24 /* NonPublicAccessibilityModifier */;
                if (sourcePropAccessibility !== targetPropAccessibility) {
                    return 0 /* False */;
                }
                if (sourcePropAccessibility) {
                    if (getTargetSymbol(sourceProp) !== getTargetSymbol(targetProp)) {
                        return 0 /* False */;
                    }
                }
                else {
                    if ((sourceProp.flags & 16777216 /* Optional */) !== (targetProp.flags & 16777216 /* Optional */)) {
                        return 0 /* False */;
                    }
                }
                if (isReadonlySymbol(sourceProp) !== isReadonlySymbol(targetProp)) {
                    return 0 /* False */;
                }
                return compareTypes(getTypeOfSymbol(sourceProp), getTypeOfSymbol(targetProp));
            }
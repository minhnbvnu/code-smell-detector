function isValidOverrideOf(sourceProp, targetProp) {
                return !forEachProperty2(targetProp, (tp) => getDeclarationModifierFlagsFromSymbol(tp) & 16 /* Protected */ ? !isPropertyInClassDerivedFrom(sourceProp, getDeclaringClass(tp)) : false);
            }
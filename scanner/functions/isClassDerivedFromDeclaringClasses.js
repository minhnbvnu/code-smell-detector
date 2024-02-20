function isClassDerivedFromDeclaringClasses(checkClass, prop, writing) {
                return forEachProperty2(prop, (p) => getDeclarationModifierFlagsFromSymbol(p, writing) & 16 /* Protected */ ? !hasBaseType(checkClass, getDeclaringClass(p)) : false) ? void 0 : checkClass;
            }
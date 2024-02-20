function isPropertyDeclaredInAncestorClass(prop) {
                if (!(prop.parent.flags & 32 /* Class */)) {
                    return false;
                }
                let classType = getTypeOfSymbol(prop.parent);
                while (true) {
                    classType = classType.symbol && getSuperClass(classType);
                    if (!classType) {
                        return false;
                    }
                    const superProperty = getPropertyOfType(classType, prop.escapedName);
                    if (superProperty && superProperty.valueDeclaration) {
                        return true;
                    }
                }
            }
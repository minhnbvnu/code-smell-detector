function getTypeOfPropertyInBaseClass(property) {
                const classType = getDeclaringClass(property);
                const baseClassType = classType && getBaseTypes(classType)[0];
                return baseClassType && getTypeOfPropertyOfType(baseClassType, property.escapedName);
            }
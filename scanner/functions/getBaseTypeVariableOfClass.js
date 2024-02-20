function getBaseTypeVariableOfClass(symbol) {
                const baseConstructorType = getBaseConstructorTypeOfClass(getDeclaredTypeOfClassOrInterface(symbol));
                return baseConstructorType.flags & 8650752 /* TypeVariable */ ? baseConstructorType : baseConstructorType.flags & 2097152 /* Intersection */ ? find(baseConstructorType.types, (t) => !!(t.flags & 8650752 /* TypeVariable */)) : void 0;
            }
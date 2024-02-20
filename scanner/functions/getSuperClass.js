function getSuperClass(classType) {
                const x = getBaseTypes(classType);
                if (x.length === 0) {
                    return void 0;
                }
                return getIntersectionType(x);
            }
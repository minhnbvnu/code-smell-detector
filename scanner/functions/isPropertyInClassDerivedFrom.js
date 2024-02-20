function isPropertyInClassDerivedFrom(prop, baseClass) {
                return forEachProperty2(prop, (sp) => {
                    const sourceClass = getDeclaringClass(sp);
                    return sourceClass ? hasBaseType(sourceClass, baseClass) : false;
                });
            }
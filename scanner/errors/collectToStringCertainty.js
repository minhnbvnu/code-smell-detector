function collectToStringCertainty(type) {
                const toString = typeChecker.getPropertyOfType(type, 'toString');
                const declarations = toString === null || toString === void 0 ? void 0 : toString.getDeclarations();
                if (!toString || !declarations || declarations.length === 0) {
                    return Usefulness.Always;
                }
                // Patch for old version TypeScript, the Boolean type definition missing toString()
                if (type.flags & ts.TypeFlags.Boolean ||
                    type.flags & ts.TypeFlags.BooleanLiteral) {
                    return Usefulness.Always;
                }
                if (ignoredTypeNames.includes(util.getTypeName(typeChecker, type))) {
                    return Usefulness.Always;
                }
                if (declarations.every(({ parent }) => !ts.isInterfaceDeclaration(parent) || parent.name.text !== 'Object')) {
                    return Usefulness.Always;
                }
                if (type.isIntersection()) {
                    for (const subType of type.types) {
                        const subtypeUsefulness = collectToStringCertainty(subType);
                        if (subtypeUsefulness === Usefulness.Always) {
                            return Usefulness.Always;
                        }
                    }
                    return Usefulness.Never;
                }
                if (!type.isUnion()) {
                    return Usefulness.Never;
                }
                let allSubtypesUseful = true;
                let someSubtypeUseful = false;
                for (const subType of type.types) {
                    const subtypeUsefulness = collectToStringCertainty(subType);
                    if (subtypeUsefulness !== Usefulness.Always && allSubtypesUseful) {
                        allSubtypesUseful = false;
                    }
                    if (subtypeUsefulness !== Usefulness.Never && !someSubtypeUseful) {
                        someSubtypeUseful = true;
                    }
                }
                if (allSubtypesUseful && someSubtypeUseful) {
                    return Usefulness.Always;
                }
                if (someSubtypeUseful) {
                    return Usefulness.Sometimes;
                }
                return Usefulness.Never;
            }
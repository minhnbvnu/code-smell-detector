function getAllPossiblePropertiesOfTypes(types) {
                const unionType = getUnionType(types);
                if (!(unionType.flags & 1048576 /* Union */)) {
                    return getAugmentedPropertiesOfType(unionType);
                }
                const props = createSymbolTable();
                for (const memberType of types) {
                    for (const { escapedName } of getAugmentedPropertiesOfType(memberType)) {
                        if (!props.has(escapedName)) {
                            const prop = createUnionOrIntersectionProperty(unionType, escapedName);
                            if (prop)
                                props.set(escapedName, prop);
                        }
                    }
                }
                return arrayFrom(props.values());
            }
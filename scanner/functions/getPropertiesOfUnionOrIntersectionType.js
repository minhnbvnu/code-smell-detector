function getPropertiesOfUnionOrIntersectionType(type) {
                if (!type.resolvedProperties) {
                    const members = createSymbolTable();
                    for (const current of type.types) {
                        for (const prop of getPropertiesOfType(current)) {
                            if (!members.has(prop.escapedName)) {
                                const combinedProp = getPropertyOfUnionOrIntersectionType(type, prop.escapedName);
                                if (combinedProp) {
                                    members.set(prop.escapedName, combinedProp);
                                }
                            }
                        }
                        if (type.flags & 1048576 /* Union */ && getIndexInfosOfType(current).length === 0) {
                            break;
                        }
                    }
                    type.resolvedProperties = getNamedMembers(members);
                }
                return type.resolvedProperties;
            }
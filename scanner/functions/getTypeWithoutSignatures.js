function getTypeWithoutSignatures(type) {
                if (type.flags & 524288 /* Object */) {
                    const resolved = resolveStructuredTypeMembers(type);
                    if (resolved.constructSignatures.length || resolved.callSignatures.length) {
                        const result = createObjectType(16 /* Anonymous */, type.symbol);
                        result.members = resolved.members;
                        result.properties = resolved.properties;
                        result.callSignatures = emptyArray;
                        result.constructSignatures = emptyArray;
                        result.indexInfos = emptyArray;
                        return result;
                    }
                }
                else if (type.flags & 2097152 /* Intersection */) {
                    return getIntersectionType(map(type.types, getTypeWithoutSignatures));
                }
                return type;
            }
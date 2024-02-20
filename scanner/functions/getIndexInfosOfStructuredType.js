function getIndexInfosOfStructuredType(type) {
                if (type.flags & 3670016 /* StructuredType */) {
                    const resolved = resolveStructuredTypeMembers(type);
                    return resolved.indexInfos;
                }
                return emptyArray;
            }
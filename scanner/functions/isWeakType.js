function isWeakType(type) {
                if (type.flags & 524288 /* Object */) {
                    const resolved = resolveStructuredTypeMembers(type);
                    return resolved.callSignatures.length === 0 && resolved.constructSignatures.length === 0 && resolved.indexInfos.length === 0 && resolved.properties.length > 0 && every(resolved.properties, (p) => !!(p.flags & 16777216 /* Optional */));
                }
                if (type.flags & 2097152 /* Intersection */) {
                    return every(type.types, isWeakType);
                }
                return false;
            }
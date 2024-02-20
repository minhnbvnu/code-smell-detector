function getSignaturesOfStructuredType(type, kind) {
                if (type.flags & 3670016 /* StructuredType */) {
                    const resolved = resolveStructuredTypeMembers(type);
                    return kind === 0 /* Call */ ? resolved.callSignatures : resolved.constructSignatures;
                }
                return emptyArray;
            }
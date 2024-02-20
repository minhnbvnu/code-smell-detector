function isUnknownLikeUnionType(type) {
                if (strictNullChecks && type.flags & 1048576 /* Union */) {
                    if (!(type.objectFlags & 33554432 /* IsUnknownLikeUnionComputed */)) {
                        const types = type.types;
                        type.objectFlags |= 33554432 /* IsUnknownLikeUnionComputed */ | (types.length >= 3 && types[0].flags & 32768 /* Undefined */ && types[1].flags & 65536 /* Null */ && some(types, isEmptyAnonymousObjectType) ? 67108864 /* IsUnknownLikeUnion */ : 0);
                    }
                    return !!(type.objectFlags & 67108864 /* IsUnknownLikeUnion */);
                }
                return false;
            }
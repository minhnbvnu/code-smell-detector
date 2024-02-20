function isTypeSubsetOfUnion(source, target) {
                if (source.flags & 1048576 /* Union */) {
                    for (const t of source.types) {
                        if (!containsType(target.types, t)) {
                            return false;
                        }
                    }
                    return true;
                }
                if (source.flags & 1056 /* EnumLike */ && getBaseTypeOfEnumLikeType(source) === target) {
                    return true;
                }
                return containsType(target.types, source);
            }
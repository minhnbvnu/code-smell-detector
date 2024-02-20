function getBestMatchIndexedAccessTypeOrUndefined(source, target, nameType) {
                const idx = getIndexedAccessTypeOrUndefined(target, nameType);
                if (idx) {
                    return idx;
                }
                if (target.flags & 1048576 /* Union */) {
                    const best = getBestMatchingType(source, target);
                    if (best) {
                        return getIndexedAccessTypeOrUndefined(best, nameType);
                    }
                }
            }
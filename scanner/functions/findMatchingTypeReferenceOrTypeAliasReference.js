function findMatchingTypeReferenceOrTypeAliasReference(source, unionTarget) {
                const sourceObjectFlags = getObjectFlags(source);
                if (sourceObjectFlags & (4 /* Reference */ | 16 /* Anonymous */) && unionTarget.flags & 1048576 /* Union */) {
                    return find(unionTarget.types, (target) => {
                        if (target.flags & 524288 /* Object */) {
                            const overlapObjFlags = sourceObjectFlags & getObjectFlags(target);
                            if (overlapObjFlags & 4 /* Reference */) {
                                return source.target === target.target;
                            }
                            if (overlapObjFlags & 16 /* Anonymous */) {
                                return !!source.aliasSymbol && source.aliasSymbol === target.aliasSymbol;
                            }
                        }
                        return false;
                    });
                }
            }
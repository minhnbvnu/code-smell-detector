function typeHasProtectedAccessibleBase(target, type) {
                const baseTypes = getBaseTypes(type);
                if (!length(baseTypes)) {
                    return false;
                }
                const firstBase = baseTypes[0];
                if (firstBase.flags & 2097152 /* Intersection */) {
                    const types = firstBase.types;
                    const mixinFlags = findMixins(types);
                    let i = 0;
                    for (const intersectionMember of firstBase.types) {
                        if (!mixinFlags[i]) {
                            if (getObjectFlags(intersectionMember) & (1 /* Class */ | 2 /* Interface */)) {
                                if (intersectionMember.symbol === target) {
                                    return true;
                                }
                                if (typeHasProtectedAccessibleBase(target, intersectionMember)) {
                                    return true;
                                }
                            }
                        }
                        i++;
                    }
                    return false;
                }
                if (firstBase.symbol === target) {
                    return true;
                }
                return typeHasProtectedAccessibleBase(target, firstBase);
            }
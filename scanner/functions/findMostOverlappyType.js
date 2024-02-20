function findMostOverlappyType(source, unionTarget) {
                let bestMatch;
                if (!(source.flags & (134348796 /* Primitive */ | 406847488 /* InstantiablePrimitive */))) {
                    let matchingCount = 0;
                    for (const target of unionTarget.types) {
                        if (!(target.flags & (134348796 /* Primitive */ | 406847488 /* InstantiablePrimitive */))) {
                            const overlap = getIntersectionType([getIndexType(source), getIndexType(target)]);
                            if (overlap.flags & 4194304 /* Index */) {
                                return target;
                            }
                            else if (isUnitType(overlap) || overlap.flags & 1048576 /* Union */) {
                                const len = overlap.flags & 1048576 /* Union */ ? countWhere(overlap.types, isUnitType) : 1;
                                if (len >= matchingCount) {
                                    bestMatch = target;
                                    matchingCount = len;
                                }
                            }
                        }
                    }
                }
                return bestMatch;
            }
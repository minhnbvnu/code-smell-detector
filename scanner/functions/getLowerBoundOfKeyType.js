function getLowerBoundOfKeyType(type) {
                if (type.flags & 4194304 /* Index */) {
                    const t = getApparentType(type.type);
                    return isGenericTupleType(t) ? getKnownKeysOfTupleType(t) : getIndexType(t);
                }
                if (type.flags & 16777216 /* Conditional */) {
                    if (type.root.isDistributive) {
                        const checkType = type.checkType;
                        const constraint = getLowerBoundOfKeyType(checkType);
                        if (constraint !== checkType) {
                            return getConditionalTypeInstantiation(type, prependTypeMapping(type.root.checkType, constraint, type.mapper));
                        }
                    }
                    return type;
                }
                if (type.flags & 1048576 /* Union */) {
                    return mapType(type, getLowerBoundOfKeyType, 
                    /*noReductions*/
                    true);
                }
                if (type.flags & 2097152 /* Intersection */) {
                    const types = type.types;
                    if (types.length === 2 && !!(types[0].flags & (4 /* String */ | 8 /* Number */ | 64 /* BigInt */)) && types[1] === emptyTypeLiteralType) {
                        return type;
                    }
                    return getIntersectionType(sameMap(type.types, getLowerBoundOfKeyType));
                }
                return type;
            }
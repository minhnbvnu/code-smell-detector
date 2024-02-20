function filterType(type, f) {
                if (type.flags & 1048576 /* Union */) {
                    const types = type.types;
                    const filtered = filter(types, f);
                    if (filtered === types) {
                        return type;
                    }
                    const origin = type.origin;
                    let newOrigin;
                    if (origin && origin.flags & 1048576 /* Union */) {
                        const originTypes = origin.types;
                        const originFiltered = filter(originTypes, (t) => !!(t.flags & 1048576 /* Union */) || f(t));
                        if (originTypes.length - originFiltered.length === types.length - filtered.length) {
                            if (originFiltered.length === 1) {
                                return originFiltered[0];
                            }
                            newOrigin = createOriginUnionOrIntersectionType(1048576 /* Union */, originFiltered);
                        }
                    }
                    return getUnionTypeFromSortedList(filtered, type.objectFlags & (32768 /* PrimitiveUnion */ | 16777216 /* ContainsIntersections */), 
                    /*aliasSymbol*/
                    void 0, 
                    /*aliasTypeArguments*/
                    void 0, newOrigin);
                }
                return type.flags & 131072 /* Never */ || f(type) ? type : neverType;
            }
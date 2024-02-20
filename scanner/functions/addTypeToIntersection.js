function addTypeToIntersection(typeSet, includes, type) {
                const flags = type.flags;
                if (flags & 2097152 /* Intersection */) {
                    return addTypesToIntersection(typeSet, includes, type.types);
                }
                if (isEmptyAnonymousObjectType(type)) {
                    if (!(includes & 16777216 /* IncludesEmptyObject */)) {
                        includes |= 16777216 /* IncludesEmptyObject */;
                        typeSet.set(type.id.toString(), type);
                    }
                }
                else {
                    if (flags & 3 /* AnyOrUnknown */) {
                        if (type === wildcardType)
                            includes |= 8388608 /* IncludesWildcard */;
                    }
                    else if (strictNullChecks || !(flags & 98304 /* Nullable */)) {
                        if (type === missingType) {
                            includes |= 262144 /* IncludesMissingType */;
                            type = undefinedType;
                        }
                        if (!typeSet.has(type.id.toString())) {
                            if (type.flags & 109472 /* Unit */ && includes & 109472 /* Unit */) {
                                includes |= 67108864 /* NonPrimitive */;
                            }
                            typeSet.set(type.id.toString(), type);
                        }
                    }
                    includes |= flags & 205258751 /* IncludesMask */;
                }
                return includes;
            }
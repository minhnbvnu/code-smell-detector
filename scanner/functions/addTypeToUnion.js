function addTypeToUnion(typeSet, includes, type) {
                const flags = type.flags;
                if (flags & 1048576 /* Union */) {
                    return addTypesToUnion(typeSet, includes | (isNamedUnionType(type) ? 1048576 /* Union */ : 0), type.types);
                }
                if (!(flags & 131072 /* Never */)) {
                    includes |= flags & 205258751 /* IncludesMask */;
                    if (flags & 465829888 /* Instantiable */)
                        includes |= 33554432 /* IncludesInstantiable */;
                    if (type === wildcardType)
                        includes |= 8388608 /* IncludesWildcard */;
                    if (!strictNullChecks && flags & 98304 /* Nullable */) {
                        if (!(getObjectFlags(type) & 65536 /* ContainsWideningType */))
                            includes |= 4194304 /* IncludesNonWideningType */;
                    }
                    else {
                        const len = typeSet.length;
                        const index = len && type.id > typeSet[len - 1].id ? ~len : binarySearch(typeSet, type, getTypeId, compareValues);
                        if (index < 0) {
                            typeSet.splice(~index, 0, type);
                        }
                    }
                }
                return includes;
            }
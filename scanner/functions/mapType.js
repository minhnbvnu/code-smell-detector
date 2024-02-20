function mapType(type, mapper, noReductions) {
                if (type.flags & 131072 /* Never */) {
                    return type;
                }
                if (!(type.flags & 1048576 /* Union */)) {
                    return mapper(type);
                }
                const origin = type.origin;
                const types = origin && origin.flags & 1048576 /* Union */ ? origin.types : type.types;
                let mappedTypes;
                let changed = false;
                for (const t of types) {
                    const mapped = t.flags & 1048576 /* Union */ ? mapType(t, mapper, noReductions) : mapper(t);
                    changed || (changed = t !== mapped);
                    if (mapped) {
                        if (!mappedTypes) {
                            mappedTypes = [mapped];
                        }
                        else {
                            mappedTypes.push(mapped);
                        }
                    }
                }
                return changed ? mappedTypes && getUnionType(mappedTypes, noReductions ? 0 /* None */ : 1 /* Literal */) : type;
            }
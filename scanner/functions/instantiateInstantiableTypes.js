function instantiateInstantiableTypes(type, mapper) {
                if (type.flags & 465829888 /* Instantiable */) {
                    return instantiateType(type, mapper);
                }
                if (type.flags & 1048576 /* Union */) {
                    return getUnionType(map(type.types, (t) => instantiateInstantiableTypes(t, mapper)), 0 /* None */);
                }
                if (type.flags & 2097152 /* Intersection */) {
                    return getIntersectionType(map(type.types, (t) => instantiateInstantiableTypes(t, mapper)));
                }
                return type;
            }
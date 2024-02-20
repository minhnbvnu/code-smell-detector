function getReducedType(type) {
                if (type.flags & 1048576 /* Union */ && type.objectFlags & 16777216 /* ContainsIntersections */) {
                    return type.resolvedReducedType || (type.resolvedReducedType = getReducedUnionType(type));
                }
                else if (type.flags & 2097152 /* Intersection */) {
                    if (!(type.objectFlags & 16777216 /* IsNeverIntersectionComputed */)) {
                        type.objectFlags |= 16777216 /* IsNeverIntersectionComputed */ | (some(getPropertiesOfUnionOrIntersectionType(type), isNeverReducedProperty) ? 33554432 /* IsNeverIntersection */ : 0);
                    }
                    return type.objectFlags & 33554432 /* IsNeverIntersection */ ? neverType : type;
                }
                return type;
            }
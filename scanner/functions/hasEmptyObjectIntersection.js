function hasEmptyObjectIntersection(type) {
                return someType(type, (t) => t === unknownEmptyObjectType || !!(t.flags & 2097152 /* Intersection */) && isEmptyAnonymousObjectType(getBaseConstraintOrType(t)));
            }
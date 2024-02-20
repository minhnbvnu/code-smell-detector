function everyContainedType(type, f) {
                return type.flags & 3145728 /* UnionOrIntersection */ ? every(type.types, f) : f(type);
            }
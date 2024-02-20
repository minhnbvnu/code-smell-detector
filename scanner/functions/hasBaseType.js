function hasBaseType(type, checkBase) {
                return check(type);
                function check(type2) {
                    if (getObjectFlags(type2) & (3 /* ClassOrInterface */ | 4 /* Reference */)) {
                        const target = getTargetType(type2);
                        return target === checkBase || some(getBaseTypes(target), check);
                    }
                    else if (type2.flags & 2097152 /* Intersection */) {
                        return some(type2.types, check);
                    }
                    return false;
                }
            }
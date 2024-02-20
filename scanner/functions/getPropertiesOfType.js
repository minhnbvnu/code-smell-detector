function getPropertiesOfType(type) {
                type = getReducedApparentType(type);
                return type.flags & 3145728 /* UnionOrIntersection */ ? getPropertiesOfUnionOrIntersectionType(type) : getPropertiesOfObjectType(type);
            }
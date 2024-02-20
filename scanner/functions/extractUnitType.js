function extractUnitType(type) {
                return type.flags & 2097152 /* Intersection */ ? find(type.types, isUnitType) || type : type;
            }
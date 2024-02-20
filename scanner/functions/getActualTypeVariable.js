function getActualTypeVariable(type) {
                if (type.flags & 33554432 /* Substitution */) {
                    return getActualTypeVariable(type.baseType);
                }
                if (type.flags & 8388608 /* IndexedAccess */ && (type.objectType.flags & 33554432 /* Substitution */ || type.indexType.flags & 33554432 /* Substitution */)) {
                    return getIndexedAccessType(getActualTypeVariable(type.objectType), getActualTypeVariable(type.indexType));
                }
                return type;
            }
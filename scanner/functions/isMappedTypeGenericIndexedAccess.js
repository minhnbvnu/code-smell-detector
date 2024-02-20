function isMappedTypeGenericIndexedAccess(type) {
                let objectType;
                return !!(type.flags & 8388608 /* IndexedAccess */ && getObjectFlags(objectType = type.objectType) & 32 /* Mapped */ && !isGenericMappedType(objectType) && isGenericIndexType(type.indexType) && !(getMappedTypeModifiers(objectType) & 8 /* ExcludeOptional */) && !objectType.declaration.nameType);
            }
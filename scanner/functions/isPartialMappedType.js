function isPartialMappedType(type) {
                return !!(getObjectFlags(type) & 32 /* Mapped */ && getMappedTypeModifiers(type) & 4 /* IncludeOptional */);
            }
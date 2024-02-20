function getSimplifiedType(type, writing) {
                return type.flags & 8388608 /* IndexedAccess */ ? getSimplifiedIndexedAccessType(type, writing) : type.flags & 16777216 /* Conditional */ ? getSimplifiedConditionalType(type, writing) : type;
            }
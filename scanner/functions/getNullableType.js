function getNullableType(type, flags) {
                const missing = flags & ~type.flags & (32768 /* Undefined */ | 65536 /* Null */);
                return missing === 0 ? type : missing === 32768 /* Undefined */ ? getUnionType([type, undefinedType]) : missing === 65536 /* Null */ ? getUnionType([type, nullType]) : getUnionType([type, undefinedType, nullType]);
            }
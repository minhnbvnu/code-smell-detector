function getGenericObjectFlags(type) {
                if (type.flags & 3145728 /* UnionOrIntersection */) {
                    if (!(type.objectFlags & 2097152 /* IsGenericTypeComputed */)) {
                        type.objectFlags |= 2097152 /* IsGenericTypeComputed */ | reduceLeft(type.types, (flags, t) => flags | getGenericObjectFlags(t), 0);
                    }
                    return type.objectFlags & 12582912 /* IsGenericType */;
                }
                if (type.flags & 33554432 /* Substitution */) {
                    if (!(type.objectFlags & 2097152 /* IsGenericTypeComputed */)) {
                        type.objectFlags |= 2097152 /* IsGenericTypeComputed */ | getGenericObjectFlags(type.baseType) | getGenericObjectFlags(type.constraint);
                    }
                    return type.objectFlags & 12582912 /* IsGenericType */;
                }
                return (type.flags & 58982400 /* InstantiableNonPrimitive */ || isGenericMappedType(type) || isGenericTupleType(type) ? 4194304 /* IsGenericObjectType */ : 0) | (type.flags & (58982400 /* InstantiableNonPrimitive */ | 4194304 /* Index */ | 134217728 /* TemplateLiteral */ | 268435456 /* StringMapping */) && !isPatternLiteralType(type) ? 8388608 /* IsGenericIndexType */ : 0);
            }
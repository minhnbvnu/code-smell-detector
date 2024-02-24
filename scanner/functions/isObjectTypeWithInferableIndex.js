function isObjectTypeWithInferableIndex(type) {
                const objectFlags = getObjectFlags(type);
                return type.flags & 2097152 /* Intersection */ ? every(type.types, isObjectTypeWithInferableIndex) : !!(type.symbol && (type.symbol.flags & (4096 /* ObjectLiteral */ | 2048 /* TypeLiteral */ | 384 /* Enum */ | 512 /* ValueModule */)) !== 0 && !(type.symbol.flags & 32 /* Class */) && !typeHasCallOrConstructSignatures(type)) || !!(objectFlags & 4194304 /* ObjectRestType */) || !!(objectFlags & 1024 /* ReverseMapped */ && isObjectTypeWithInferableIndex(type.source));
            }
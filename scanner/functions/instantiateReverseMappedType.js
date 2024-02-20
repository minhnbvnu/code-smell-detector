function instantiateReverseMappedType(type, mapper) {
                const innerMappedType = instantiateType(type.mappedType, mapper);
                if (!(getObjectFlags(innerMappedType) & 32 /* Mapped */)) {
                    return type;
                }
                const innerIndexType = instantiateType(type.constraintType, mapper);
                if (!(innerIndexType.flags & 4194304 /* Index */)) {
                    return type;
                }
                const instantiated = inferTypeForHomomorphicMappedType(instantiateType(type.source, mapper), innerMappedType, innerIndexType);
                if (instantiated) {
                    return instantiated;
                }
                return type;
            }
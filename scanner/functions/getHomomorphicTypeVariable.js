function getHomomorphicTypeVariable(type) {
                const constraintType = getConstraintTypeFromMappedType(type);
                if (constraintType.flags & 4194304 /* Index */) {
                    const typeVariable = getActualTypeVariable(constraintType.type);
                    if (typeVariable.flags & 262144 /* TypeParameter */) {
                        return typeVariable;
                    }
                }
                return void 0;
            }
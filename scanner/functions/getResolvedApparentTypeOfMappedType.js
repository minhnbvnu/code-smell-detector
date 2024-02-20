function getResolvedApparentTypeOfMappedType(type) {
                const typeVariable = getHomomorphicTypeVariable(type);
                if (typeVariable && !type.declaration.nameType) {
                    const constraint = getConstraintOfTypeParameter(typeVariable);
                    if (constraint && isArrayOrTupleType(constraint)) {
                        return instantiateType(type, prependTypeMapping(typeVariable, constraint, type.mapper));
                    }
                }
                return type;
            }
function isGenericMappedType(type) {
                if (getObjectFlags(type) & 32 /* Mapped */) {
                    const constraint = getConstraintTypeFromMappedType(type);
                    if (isGenericIndexType(constraint)) {
                        return true;
                    }
                    const nameType = getNameTypeFromMappedType(type);
                    if (nameType && isGenericIndexType(instantiateType(nameType, makeUnaryTypeMapper(getTypeParameterFromMappedType(type), constraint)))) {
                        return true;
                    }
                }
                return false;
            }
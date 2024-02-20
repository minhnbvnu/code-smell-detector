function getConstraintTypeFromMappedType(type) {
                return type.constraintType || (type.constraintType = getConstraintOfTypeParameter(getTypeParameterFromMappedType(type)) || errorType);
            }
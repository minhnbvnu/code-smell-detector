function hasNonCircularTypeParameterDefault(typeParameter) {
                return getResolvedTypeParameterDefault(typeParameter) !== circularConstraintType;
            }